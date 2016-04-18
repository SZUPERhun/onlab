import path from 'path';

import winston from 'winston';
import convict from 'convict';

//require('dotenv').config();

const conf = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['prod', 'dev', 'test'],
    default: 'dev',
    env: 'NODE_ENV',
    arg: 'env',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  database: {
    doc: 'Address of the admin database.',
    format: String,
    default: 'mongodb://localhost/onlab',
    env: 'DB_HOST',
    arg: 'dbHost',
  },
  apiUrl: {
    doc: 'Address of the api.',
    format: String,
    default: 'Did you expect an url? It will cause an error sometime.',
    env: 'API_URL',
    arg: 'apiUrl',
  },
  secret: {
    doc: 'Secret of the application.',
    format: String,
    default: 'The cake is a lie.',
    env: 'SECRET',
    arg: 'secret',
  },
});

// Load environment dependent configuration
const env = conf.get('env');
conf.loadFile(path.normalize(`${__dirname}/configs/${env}.json`));

// Perform validation
conf.validate({
  strict: true,
});

winston.info(`ENV ${env}`);
module.exports = conf.getProperties();