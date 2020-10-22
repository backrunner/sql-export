import Koa from 'koa';
import Router from '@koa/router';
import config from './config';
import mysql from './src/db';
import loader from './src/loader';
import logger from './src/logger';
import cron from './src/loader';
import buildApi from './src/api';

const app = new Koa();
const router = new Router();

app.use(mysql);
app.use(loader);
app.use(cron);

buildApi(router);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, () => {
  logger.info(`SQL Export Service is running. [localhost:${config.port}]`);
});
