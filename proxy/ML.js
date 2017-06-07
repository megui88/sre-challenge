'use strict';
var rp = require('request-promise');

module.exports = ml;

function ml()
{
    var api = this;
    const URL = 'https://api.mercadolibre.com/';
    const ITEMS_PATH = URL + 'items/';
    const CHILDREN_PATH = '/children';

    api.get = function(id){
        return rp(ITEMS_PATH + id);
    };

    api.getChildren = function(id){
        return rp(ITEMS_PATH + id + CHILDREN_PATH);
    };

    return api;
}
