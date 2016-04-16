
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';

import winston from 'winston';
import 'clarify';

import index from './routes/index';
import users from './routes/users';
import conf from './config';

const app = express();

// view engine setup
app.set('views', path.join(__dirname + '/../front', 'views'));
app.set('view engine', 'ejs');

// set the static files location /front/img will be /img for users
app.use(express.static(__dirname + '/../front'));
// redirect JS Angular
app.use('/js', express.static(__dirname + '/../../node_modules/angular'));
// redirect JS Angular Route
app.use('/js', express.static(__dirname + '/../../node_modules/angular-route'));
// redirect JS bootstrap 
app.use('/js', express.static(__dirname + '/../../node_modules/bootstrap/dist/js'));
// redirect JS jQuery
app.use('/js', express.static(__dirname + '/../../node_modules/jquery/dist'));
// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/../../node_modules/bootstrap/dist/css'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/', index);
app.use('/api/users', users);

mongoose.Promise = global.Promise;
mongoose.connect(conf.database, function(err) {
  if (err) {
    return winston.error('Error connecting to the database.', err);
  }
  winston.info('Connected to Database: ' + conf.database);
});

/**
 * Get port from environment and store in Express.
 */

app.set('port', conf.port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(conf.port);
winston.info('App listening on port ' + conf.port);

module.exports = app;