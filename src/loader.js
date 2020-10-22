import { requireDir } from './utils';
import path from 'path';

const tasks = requireDir(path.resolve(__dirname, '../tasks'));

const loader = async (ctx, next) => {
  ctx.tasks = tasks;
  await next();
};

export default loader;