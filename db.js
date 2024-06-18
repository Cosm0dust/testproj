const Pool = require("pg").Pool;

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'testproject',
   password: process.env.DATABASE_PASSWORD,
   port: 5432,
})

module.exports = pool