const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { pool } = require('./utils/db')

// Routers
const AuthRouter = require('./routes/api/auth')
const ConfigRouter = require('./routes/api/configs')

// Get Port
function getPort(){
    conn = pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT port FROM FediShorts.config WHERE service_name = 'ConfigServer'") // Fetch the config.
        .then((rows) => {
          const port = rows[0]["port"]
          conn.end()
          app.listen(port, () => {
            console.log(`Config Server listening on ${port}`)
          })
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
}


// Server Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Initialize the routers
app.use('/api/auth', AuthRouter)
app.use('/api/config', ConfigRouter)


app.get('/', (req, res) => {
    res.send('API Working.')
})


getPort() // Start server