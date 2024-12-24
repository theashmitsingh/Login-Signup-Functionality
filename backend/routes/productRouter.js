const express = require('express');
const ensureAuthenticated = require('../middlewares/Auth');
const router = express.Router();


router.get ("/", ensureAuthenticated, (req, res) => {
    console.log("Logged In User Details: ", req.user);
    return res.status(200).json([
        {
            name: "mobile",
            price: 100000
        },
        {
            name: "TV",
            price: "25000"
        }
    ])
});

module.exports = router;