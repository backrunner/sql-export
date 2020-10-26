export const sqlQuery = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results, fields) => {
      if (err) {
        reject(err);
      }
      resolve({ results, fields });
    });
  });
}
