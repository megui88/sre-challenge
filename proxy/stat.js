'use strict';

var elasticsearch = require('elasticsearch');

function Stat() {
    var service = this;
    var client = new elasticsearch.Client({host: 'elasticsearch:9200'});
    const INDEX = 'proxy-stats';
    const TYPE = 'stat';
    service.Object = function () {
        return {
            status_code: null,
            date: new Date(),
            avg_response_time: 0,
            avg_response_time_api_calls: []
        };
    };
    service.push = function (data) {
        console.log(data);
        var avg_response_time = 0;
        var avg_response_count = data.avg_response_time_api_calls.length;
        data.avg_response_time_api_calls.forEach(function (e) {
            avg_response_time += e;
        });

        if(0 < avg_response_count){
            avg_response_time = avg_response_time/avg_response_count;
        }
        client.create({
            index: INDEX,
            type: TYPE,
            body: {
                status_code: data.status_code,
                date: data.date.toISOString(),
                avg_response_time: data.avg_response_time,
                avg_response_time_api_calls: avg_response_time,
                total_count_api_calls: avg_response_count

            }
        });
    };
    function getLast() {
        var init = new Date('now -1 day');
        return client.search({
            index: INDEX,
            type: TYPE,
            body: {
                range: {
                    born: {
                        gte: init.toDateString(),
                        lte: 'now'
                    }
                }
            }
        });
    };

    service.health = function () {
        var pp = [];
        var lastStats = getLast();
        lastStats.then(function(items){

        });
        return pp;
    };

    return service;
}

module.exports = Stat;
