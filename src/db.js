import mysql from 'mysql2';
import config from '../config';

const { user, pass, port, host, database } = config.mysql;

const connection = mysql.createPool({
  host,
  port,
  user,
  password: pass,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const fn = async (ctx, next) => {
  ctx.mysql = connection;
  await next();
}

export default fn;
