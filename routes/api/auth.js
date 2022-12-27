const { Router } = require('express')
const router = Router();
const db = require('../../utils/db')

//Add all the endpoints

router.get('/login', (req, res) => {
    return res.json({
        "success": 1,
        "data": {
            "message": "Login endpoint is alive :)"
        }
    })
})


module.exports = router;