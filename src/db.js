import mysql from 'mysql2';
import logger from './logger';
import config from '../config';

const { user, pass, port, host, database } = config.mysql;

const connection = mysql.createConnection({
  host,
  port,
  user,
  password: pass,
  database,
});

connection.connect((err) => {
  if (err) {
    const message = 'Cannot connect to database.';
    logger.error(message);
    logger.error(err);
    throw message;
  }
  logger.info('Connected to the database.');
});

const fn = async (ctx, next) => {
  ctx.mysql = connection;
  await next();
}

export default fn;
