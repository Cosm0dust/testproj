const Pool = require("pg").Pool;

const pool = new Pool({
   user: process.env.DB_USERNAME,
   host: process.env.DB_HOST,
   database: process.env.DB_DBNAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
})

module.exports = pool