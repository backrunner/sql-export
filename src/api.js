import logger from './logger';
import { jsonSuccess, jsonError, getRecent } from './utils';

const build = (router) => {
  router.get('/doTask', async (ctx, next) => {
    if (!ctx.tasks) {
      ctx.body = jsonError('Context does not contain any task');
      return await next();
    }
    if (!ctx.query.task) {
      ctx.body = jsonError('Cannot get param [task] from query.');
      return await next();
    }
    if (!ctx.tasks[ctx.query.task]) {
      ctx.body = jsonError(`Cannot find task [${ctx.query.task}]`);
      return;
    }

    logger.info(`Manually trigger task [${ctx.query.task}]`);

    try {
      const ret = await ctx.tasks[ctx.query.task].call(null, ctx);
      ctx.body = jsonSuccess(ret);
      logger.info(`Task [${ctx.query.task} completed.]`);
    } catch (err) {
      logger.error(`Task [${ctx.query.task}] was going wrong.`);
      logger.error(err);
      ctx.body = jsonError(err);
      return await next();
    }

    await next();
  });
  router.get('/getRecent', async (ctx, next) => {
    if (!ctx.query.task) {
      ctx.body = jsonError('Cannot get param [task] from query.');
      return await next();
    }
    const recent = await getRecent(ctx.query.task);
    ctx.body = jsonSuccess(recent);
    await next();
  });
}

export default build;
