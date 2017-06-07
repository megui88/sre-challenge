'use strict';

var Item = require('./model/Item.js');

function Storage() {
    var self = this;

    self.item = {
        get: function (id) {
            return Item.findById(id);
        },
        save: function (item) {
            return Item.create(item);
        },
        saveBulk: function (array) {
            return Item.bulkCreate(array);
        }
    };

    return self;
}

module.exports = Storage;
