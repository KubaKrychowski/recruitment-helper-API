const express = require('express');
const dbContext = require('../config/db-context');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const { request } = require('express');
require("dotenv").config();

router.post('/register', async (req, res) => {
    try {
        const { login, email, password } = req.body;

        if (!(email && password && login)) {
            res.status(400).send("Bad Request");
        }

        dbContext.sync({ alter: true });

        const oldUser = await User.findOne({ where: { email } });

        if (oldUser) {
            return res.status(400).send("User already exists. Please log in");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            externalId: v4(),
            login,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`

        const token = jwt.sign({
            user_id: user.id, email
        },
            jwtSecretKey,
            {
                expiresIn: "2h"
            });

        user.token = token;

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            request.status(400).send("All inputs are required");
        }

        const user = await User.findOne({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                `${process.env.JWT_SECRET_KEY}`,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;
            await user.save();

            const result = {
                username: user.login,
                externalId: user.externalId,
                token: token,
            };

            res.status(200).json(result);
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.log(err);
    }
});

router.get('/login/:token', async (req, res) => {
    try {
        const user = await User.findOne({ where: { token: req.params.token } });

        if (!user) {
            res.status(400).send("Invalid Credentials");
        }
        let result;
        jwt.verify(req.params.token, `${process.env.JWT_SECRET_KEY}`, async (err, veryfiedToken) => {
            if (err) {
                res.status(200).json({error: err.message});
                return;
            }
             result = {
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