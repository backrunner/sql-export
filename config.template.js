export default {
  port: 8900,
  mysql: {
    user: 'root',
    pass: '123456',
    port: 3306,
    database: '',
    host: 'localhost',
  },
  schedule: {
    enable: true,
    cron: '0 0 * * *',
  },
  localOnly: true,  // if this is true, API will reject any outside request.
  output: 'C:/dataOutput', // set the output path.
}
