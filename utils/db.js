const mariadb = require('mariadb');
const { dbHost, dbUser, dbPassword, dbConnLimit, dbPort} = require('../config.json')

const pool = mariadb.createPool({
     host: dbHost, 
     user: dbUser, 
     port: dbPort,
     password: dbPassword,
     connectionLimit: dbConnLimit
});


pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT * FROM FediShorts.test_data")
        .then((rows) => {
          if(rows[0]["test_data"] == "DB Working!") { // If this does not reutrn DB Working, something is very wrong 😂
            console.log("Database connected successfully!")
          }
        })
        .catch(err => {
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
      console.log("Failed to connect to the Database.")
    conn.end()
})

//Export the pool so that we can access the database from other files.
module.exports = { pool }