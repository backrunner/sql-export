import cron from 'node-cron';
import config from '../config';
import logger from './logger';

const { cron: cronStr } = config;

let job;

const fn = async (ctx, next) => {
  if (!ctx.tasks) {
    logger.warn('Cannot get any task for cron job.');
    return await next();
  }

  if (!job) {
    job = cron.schedule(cronStr, () => {
      Object.keys(ctx.tasks).forEach((key) => {
        if (typeof ctx.tasks[key] !== 'function') {
          return;
        }
        logger.info(`[Task] task ${key} starting...`);
        ctx.tasks[key].call(null, ctx);
      });
    }, null, true, 'Asia/Shanghai');
  }

  ctx.scheduled = job;

  await next();
}

export default fn;
