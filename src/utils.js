import fs from 'fs';
import path from 'path';
import moment from 'moment';
import logger from './logger';

const recentPath = path.resolve(__dirname, '../recent.json');

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

export const getRecent = (task, sheet) => {
  return new Promise((resolve) => {
    fs.readFile(recentPath, {
      encoding: 'utf-8',
    }, (err, data) => {
      if (err) {
        resolve(null);
        return;
      }
      const recent = JSON.parse(data);
      resolve(recent[task][sheet || 'default'] || null);
    })
  });
}

export const writeRecent = (task, sheet, filename) => {
  let recent = {};
  if (fs.existsSync(recentPath)) {
    const res = fs.readFileSync(recentPath, {
      encoding: 'utf-8',
    });
    if (res) {
      recent = JSON.parse(res);
    }
  }
  if (!recent[task]) {
    recent[task] = {};
  }
  if (!sheet) {
    sheet = 'default';
  }
  if (!recent[task][sheet]) {
    recent[task][sheet] = {};
  }
  recent[task][sheet].file = filename;
  recent[task][sheet].time = moment().format('YYYY-MM-DD HH:mm:ss');
  fs.writeFileSync(recentPath, JSON.stringify(recent), {
    encoding: 'utf-8',
  });
}

export const getUserIp = (ctx) => {
  const { req } = ctx;
  return req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

export const jsonSuccess = (data = null, message = 'success') => {
  return JSON.stringify({
    code: 200,
    success: true,
    message,
    data,
  });
}

export const jsonError = (message = 'Unexpected error') => {
  return JSON.stringify({
    code: 500,
    success: false,
    message: typeof message === 'object' ? JSON.stringify(message) : message,
  });
};
