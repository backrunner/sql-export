import cron from 'node-cron';
import config from '../config';
import logger from './logger';
import mysql from './db';
import loader from './loader';

const { cron: cronStr } = config.schedule;

const ctx = {};

mysql(ctx, () => {});
loader(ctx, () => {});

cron.schedule(cronStr, () => {
  Object.keys(ctx.tasks).forEach((key) => {
    if (typeof ctx.tasks[key] !== 'function') {
      return;
    }
    logger.info(`[Task] task ${key} starting...`);
    ctx.tasks[key].call(null, ctx);
  });
}, null, true, 'Asia/Shanghai');
