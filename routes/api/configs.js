const { Router } = require('express')
const router = Router();
const db = require('../../utils/db')

//Add all the endpoints

router.get('/getConfig', (req, res) => {
    console.log(req.header('Authorization')) // With this, we would check the token against the authetication API to see if the user / server is authorized to access this endpoint.
    // For now as this isn't implemented yet, we'll just assume that the user / server is authorized.
    let isUser = true;
    if(isUser){ // Services will always get the specific config they need. Users will get all the config hence why this is required.
        if (req.body.FetchAll == true || req.body.FetchAll == 'true'){
            // Fetch all the config
            return res.json({
                "success": 1,
                "data": {
                    "message": "Fetch all config endpoint is alive :)"
                }
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