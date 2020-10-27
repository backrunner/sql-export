import fs from 'fs';
import Koa from 'koa';
import Router from '@koa/router';
import config from './config';
import mysql from './src/db';
import loader from './src/loader';
import logger from './src/logger';
import requestFilter from './src/requestFilter';
import buildApi from './src/api';

// directory test
if (!fs.existsSync('./output')) {
  fs.mkdirSync('./output');
}

// init cron
require('./src/cron');

const app = new Koa();
const router = new Router();

app.use(mysql);
app.use(loader);
app.use(requestFilter);

buildApi(router);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, () => {
  logger.info(`SQL Export Service is running. [localhost:${config.port}]`);
});
