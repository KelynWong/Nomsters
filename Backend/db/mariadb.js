const mariadb=require('mariadb');   // uses the maria db driver to connect to the Maria DB Server. npm i mariadb --save
const {config}=require('./mariadb.config.js');  // obtain the configuration on how to connect to MariaDB
const pool = mariadb.createPool(config); // creates a connection pool object to store all the connections

function query(query,value){
    return new Promise((resolve, reject)=>{   // create a promise object
        pool.getConnection()   // get a connection from the mariadb connection pool
        .then(conn => {   // when the connection is available
          conn.query(query,value)  // perform the SQL query
          .then(rows => {  // wait until we get the rows
            console.log(rows)
            conn.release()

            const parsedRows = Array.isArray(rows) ? parseRows(rows) : parseSingleRow(rows);
            resolve(parsedRows);
          }) // .then(rows => {
          .catch(err => {
            console.log(err)
            //throw err;   // throw error exception  
            conn.release()
            reject()
          }) // .catch(err => {
        }) // .then(conn => {   // when the connection is available
        .catch(err => {  // catch connection problem         
        reject()
        console.log(err)
        // conn.end();
        }) // .catch(err => {  // catch connection problem
    }); //  return new Promise(function(resolve){   // create a promise object
} //function _exec(query){

function parseRows(rows) {
  return rows.map(row => parseSingleRow(row));
}

function parseSingleRow(row) {
  for (let key in row) {
    if (typeof row[key] === 'bigint') {
      row[key] = row[key].toString();
    }
  }
  return row;
}

module.exports={
  query
}