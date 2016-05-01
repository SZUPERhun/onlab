import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import bodyParser from 'body-parser';
import session  from 'express-session';
import expressJwt  from 'express-jwt';
import path from 'path';

import winston from 'winston';
import 'clarify';

import index from './routes/index';
import login from './routes/login.api';
import register from './routes/register.api';
import users from './routes/user.api';
import events from './routes/event.api';
import conf from './config';

const app = express();

// view engine setup
app.set('views', path.join(__dirname + '/../public', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({ 
 secret: conf.secret,
 resave: false, 
 saveUninitialized: true 
 }));
// use JWT auth to secure the api
/*app.use('/api', expressJwt({ secret: conf.secret })
  .unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
*/
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/../public'));
// redirect JS Angular
app.use('/js', express.static(__dirname + '/../../node_modules/angular'));
// redirect JS Angular UI Route
app.use('/js', express.static(__dirname + '/../../node_modules/angular-ui-router/release'));
// redirect JS Angular JWT
app.use('/js', express.static(__dirname + '/../../node_modules/angular-jwt/dist'));
// redirect JS bootstrap 
app.use('/js', express.static(__dirname + '/../../node_modules/bootstrap/dist/js'));
// redirect JS jQuery
app.use('/js', express.static(__dirname + '/../../node_modules/jquery/dist'));
// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/../../node_modules/bootstrap/dist/css'));


app.use('/', index);
app.use('/api/users', users);
app.use('/api/events', events);
/*app.use('/login', login);
/*app.use('/register', register);

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