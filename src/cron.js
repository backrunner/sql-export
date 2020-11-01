import cron from 'node-cron';
import config from '../config';
import logger from './logger';
import mysql from './db';
import loader from './loader';

const { cron: cronStr } = config.schedule;

const ctx = {};

mysql(ctx, () => {});
loader(ctx, () => {});

cron.schedule(cronStr, async () => {
  const keys = Object.keys(ctx.tasks);
  for (let key of keys) {
    if (!ctx.tasks[key] || typeof ctx.tasks[key].doCronJob !== 'function') {
      return;
    }
    logger.info(`[Cron] task ${key} starting...`);
    if (typeof ctx.tasks[key].doClean === 'function') {
      await ctx.tasks[key].doClean(ctx, config);
    }
    await ctx.tasks[key].doCronJob(ctx);
    logger.info(`[Cron] task ${key} completed`);
  }
}, null, true, 'Asia/Shanghai');
