export const sqlQuery = (sql) => {
  return new Promise((resolve, reject) => {
    this.query(sql, (err, results, field) => {
      if (err) {
        reject(err);
      }
      resolve({ results, fields });
    });
  });
}
