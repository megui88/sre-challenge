'use strict';
var Timer = require('easytimer');
var timer = new Timer();
timer.start({precision: 'secondTenths'});
var express = require('express');
var cors = require('cors');
var service = require('./services.js');
var doc = require('./swagger.js');
var app = express();
var router = express.Router();
var proxy = new service();
var Stat = require('./stat');
var stats = new Stat();

app.use(cors());

router.get('/items/:id', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    proxy.get(req.params.id)
        .then(function (item) {
            res.json(item);
            proxy.stat.status_code = 200;
            proxy.stat.avg_response_time = timer.getTimeValues().secondTenths;
            stats.push(proxy.stat);
        });
});
router.get('/swagger.json', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json(doc);
});
router.get('/health', function (req, res, next) {
    stats.health
    res.setHeader('Content-Type', 'application/json');
    res.json(stats.health());
});

app.use(router);
app.listen(3000);