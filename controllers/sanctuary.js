const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    User.find({})
        .then((response) => {
            console.log('response.data', response.data);
            res.json({ response: response.data });
        });
});
