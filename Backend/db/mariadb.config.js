require('dotenv').config();

var config={
   host: process.env.MARIA_DB_HOST,
   user: process.env.MARIA_DB_USER,
   password: process.env.MARIA_DB_PASSWORD,
   port: 3307,
   database: process.env.MARIA_DB_NAME,
   connectionLimit: 10,
};

module.exports={config}
