const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ where: { token: req.params.token } });

        if (!user) {
            res.status(400).send("Invalid Credentials");
        }

        jwt.verify(req.params.token, `${process.env.JWT_SECRET_KEY}`, async (err, veryfiedToken) => {
            if (err) {
                res.status(401).send(err.message);
            }
            const result = {
                username: user.login,
                externalId: user.externalId,
                token: user.token,
            };

            res.status(200).json(result);
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;