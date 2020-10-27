import { requireDir } from './utils';
import path from 'path';
import config from '../config';

const tasks = requireDir(path.resolve(__dirname, '../tasks'));

const loader = async (ctx, next) => {
  ctx.tasks = tasks;
  if (config.output) {
    ctx.outputPath = config.output;
  }
  await next();
};

export default loader;