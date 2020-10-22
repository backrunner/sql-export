export default {
  port: 8900,
  mysql: {
    user: 'root',
    pass: '123456',
    port: 3306,
    database: 'slms',
    host: 'localhost',
  },
  schedule: {
    enable: true,
    cron: '* 3 * * *',
  }
}
