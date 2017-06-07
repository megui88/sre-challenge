'use strict';

var Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://user:userpass@db/ml_test');
const Item = sequelize.define('item', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    category_id: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    },
    start_time: {
        type: Sequelize.STRING
    },
    stop_time: {
        type: Sequelize.STRING
    },
    parent_item_id: {
        type: Sequelize.STRING
    }
});

Item.hasMany(Item, {
    as: 'children',
    foreignKey: 'parent_item_id',
    constraints: false
});
Item.sync();
module.exports = Item;