import logger from './logger';
import { jsonSuccess, jsonError } from './utils';

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
      await ctx.tasks[ctx.query.task].call(null, ctx);
    } catch (err) {
      ctx.body = jsonError(err);
      return await next();
    }

    ctx.body = jsonSuccess();
    await next();
  });
}

export default build;
