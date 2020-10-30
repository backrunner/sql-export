# SQL Export

A simple service to export data in database.

## Usage

Clone this repo and enter into the directory.

```bash
git clone -b main https://github.com/backrunner/sql-export.git --depth 1
```

Install dependencies.

```bash
npm install
```

Copy "config.template.js" to "config.js", then modify the options.

**Then write your own task script in ${root}/tasks.**

This is an example:

```js
import path from 'path';
import Excel from 'exceljs';
import { sqlQuery } from '../src/mysql';
import { writeRecent } from '../src/utils';

// necessary function
const doCronJob = async (ctx) => {
  // you should simulate koa context if your doExport function uses something like ctx.query.
  // we will use node-cron to schedule the job.
  ctx.query = {};
  await doExport(ctx);
}

// necessary function
const doExport = async (ctx) => {
  // create a workbook by exceljs, recommend to use StreamWriter.
  const workbookOptions = {
    filename: ctx.outputPath ? path.resolve(ctx.outputPath, filename) : path.resolve(__dirname, `../output/${filename}`),
    useStyles: true,
  };
  const workbook = new Excel.stream.xlsx.WorkbookWriter(workbookOptions);

  // you can use sqlQuery function to fetch data from database
  const data = await sqlQuery(ctx.mysql, SQL_QUERY);

  // you can write your own logic to export data to xlsx file here.
  // ...
  // ...
  // ...

  // **IMPORTANT call writeRecent here is necessary.
  writeRecent('hrsys', sheet, filename);
  // This return is not necessary but recommend to return some useful information as API response.
  return { file: filename };
}

// necessary export, can't change the function name.
export default { doCronJob, doExport };
```

Run the following command directly:

```bash
npm run start
```

Task will load at server startup, you can see some related logs in console.

## API

You can use API to execute export task by HTTP request:

```
/doTask?task=[YOUR_TASK]&sheet=[OPTIONAL_SHEET_PARAM]
```

And you can get recent export information by this:

```
/getRecent?task=[YOUR_TASK]&sheet=[OPTIONAL_SHEET_PARAM]
```

## License

MIT
