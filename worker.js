var SCWorker = require('socketcluster/scworker');
var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var morgan = require('morgan');
var healthChecker = require('sc-framework-health-check');

class Worker extends SCWorker {
	run() {
		console.log('   >> Worker PID:', process.pid);
		var environment = this.options.environment;
        // Load env variables
        var env = require('node-env-file');
        env('./.env');
		var app = express();

		var httpServer = this.httpServer;
		var scServer = this.scServer;
        var mysql = require('mysql');
        var pool = mysql.createPool({
            connectionLimit: 500,
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            debug: false
        });

		if (environment == 'dev') {
			// Log every HTTP request. See https://github.com/expressjs/morgan for other
			// available formats.
			app.use(morgan('dev'));
		}

		// Force express to render prettified html
		app.locals.pretty = true;

		// Set up templating engine and routes
		app.set('views', './views');
		app.set('view engine', 'jade');

		app.use(serveStatic(path.resolve(__dirname, 'public')));

		// Add GET /health-check express route
		healthChecker.attach(this, app);

		app.get('/', function(req, res) {
			res.render('index', {
				title: 'Home Page'
			});
		});

		httpServer.on('request', app);

		var count = 0;

        // Set up controller
        var ModelController = require('./controllers/ModelController');

		/*
            In here we handle our incoming realtime connections and listen for events.
        */
		scServer.on('connection', function(client) {
			'use strict';
			console.log('Client ' + client.id + ' has connected');

			client.on('messages', function(data) {
				// send data back to client
				// Socket Cluster uses 'message' internally, so use 'response'
				// client.emit('response', data);

                ModelController[data.route][data.resource](client, pool, data);
			});
		});
	}
}

new Worker();
