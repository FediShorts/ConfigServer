const { Router } = require('express')
const router = Router();
const { pool } = require('../../utils/db')

//Add all the endpoints

router.get('/getConfig', (req, res) => {
    console.log(req.header('Authorization')) // With this, we would check the token against the authetication API to see if the user / server is authorized to access this endpoint.
    // For now as this isn't implemented yet, we'll just assume that the user / server is authorized.
    
    
    let isUser = true;
    if(isUser){ // Services will always get the specific config they need. Users will get all the config hence why this is required.
        if (req.body.FetchAll == true || req.body.FetchAll == 'true'){
            // Fetch all the config
            if (req.body.serviceName == undefined || req.body.serviceName == null || req.body.serviceName == ''){
                req.body.serviceName = '*' // If the serviceName is not specified, we'll just fetch every single config.
                sql_query = "SELECT * FROM FediShorts.config"
            }
            else {
                sql_query = "SELECT * FROM FediShorts.config WHERE service_name = ?"
            }
            pool.getConnection()
            .then(conn => {
            
            conn.query(sql_query, req.body.serviceName) // Fetch the config.
            .then((rows) => {
                conn.end();
                return res.json({
                    "success": 1,
                    "data": {
                        "message": "Config fetched successfully.",
                        "config": rows
                    }
                })
            })
            }).catch(err => {
                conn.end()
                return res.json({
                    "success": 0,
                    "data": {
                    "message": "Failed to fetch config.",
                    "error_details": err
                    }
                })
            })
        } else {
            // Fetch specific config
            return res.json({
                "success": 1,
                "data": {
                    "message": "Fetch specific config endpoint is alive :)"
                }
            })
        }
    }
    if (!isUser){
        // Fetch specific config
        return res.json({
            "success": 1,
            "data": {
                "message": "Fetch server specific config endpoint is alive :)"
            }
        })
    }
})


module.exports = router;