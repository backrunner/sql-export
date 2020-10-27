import { getUserIp, jsonError } from './utils';
import logger from './logger';
import config from '../config';

const fn = async (ctx, next) => {
  const ip = getUserIp(ctx);
  if (!ip) {
    ctx.body = jsonError('Cannot identify the request.');
    logger.warn(`Cannot identify the request to [${ctx.url}].`)
    return;
  }
  if (config && config.localOnly && ip !== 'localhost' && ip !== '::1') {
    ctx.body = jsonError('Request has been rejected.');
    logger.warn(`Request from [${ip}] to [${ctx.url}] has been rejected.`);
    return;
  }
  await next();
}

export default fn;
