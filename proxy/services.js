'use strict';

var Timer = require('easytimer');
var ML = require('./ML.js');
var Promise = require('bluebird');
var Storage = require('./storage/storage.js');
var Stat = require('./stat');

function ProxyServices() {
    var service = this;
    var provider = new ML();
    var storage = new Storage();
    var stats = new Stat();
    service.stat = stats.Object();

    service.get = function (id) {
        return new Promise(function (resolver, reject) {
            storage.item.get(id).then(function (item) {
                if (item) {
                    itemDTO(item).then(resolver);
                    return;
                }
                findItem(id, resolver, reject);
            });
        });
    };

    function findItem(id, resolver, reject) {
        var timer = new Timer();
        timer.start({precision: 'secondTenths'});
        provider.get(id).then(function (data) {
            service.stat.avg_response_time_api_calls.push(timer.getTimeValues().secondTenths);
            saveItem(JSON.parse(data)).then(function (item) {
                itemDTO(item).then(function(data){
                    resolver(data);
                });
            });
        }).catch(reject);
    }

    function saveItem(item) {
        return new Promise(function (resolver, reject) {
            storage.item.save(item).then(function (object) {

                var timer = new Timer();
                timer.start({precision: 'secondTenths'});
                provider.getChildren(item.id)
                    .then(function (data) {
                        service.stat.avg_response_time_api_calls.push(timer.getTimeValues().secondTenths);
                        storage.item.saveBulk(JSON.parse(data))
                            .then(resolver(object))
                            .catch(reject);
                    });
            }).catch(reject);
        });
    }

    function itemDTO(item) {
        var i = JSON.parse(JSON.stringify(item));
        delete i.createdAt;
        delete i.updatedAt;
        return new Promise(function (resolver, reject) {
            item.getChildren().then(function (children) {
                i.children = children.map(function (item) {
                    return {
                        item_id: item.getDataValue('id'),
                        stop_time: item.getDataValue('stop_time')
                    };
                });
                resolver(i);
            }).catch(reject);
        });
    }
    return service;
}

module.exports = ProxyServices;
