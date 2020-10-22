import fs from 'fs';
import path from 'path';
import logger from './logger';

export const requireDir = (dir) => {
  const files = fs.readdirSync(dir);
  const map = {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = path.extname(file);
    if (ext !== '.js') {
      continue;
    }
    const base = path.basename(file, ext);
    try {
      map[base] = require(path.resolve(dir, file)).default;
      logger.info(`Task [${base}] is loaded.`);
    } catch (err) {
      logger.error(err);
    }
  }

  return map;
}

export const jsonSuccess = (data, message = 'success') => {
  return JSON.stringify({
    code: 200,
    success: true,
    message,
    ...(data || null),
  });
}


export const jsonError = (message = 'Unexpected error') => {
  return JSON.stringify({
    code: 500,
    success: false,
    message: typeof message === 'object' ? JSON.stringify(message) : message,
  });
};
