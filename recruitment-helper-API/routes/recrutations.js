const express = require('express');
const dbContext = require('../config/db-context');
const Recrutation = require('../models/recrutation');
const router = express.Router();

router.post('/',async (req,res,err) => {
    await dbContext.sync();

    try{
        if(!req.body.externalId){
            res.status(400).send({
                message: 'Bad request'
            })
        }

        const recrutation = {
            externalId: req.body.externalId
        }

        await Recrutation.create(recrutation);

        res.status(200).send({
            message: 'recrutation has been created'
        });
    } catch(err){
        console.log(err);
    }
});

router.get('/', async (req,res, err) => {
    await dbContext.sync();

    try {
        const result = await Recrutation.findAll();

        res.status(200).send({
            message: result
        });
    } catch(err){
        console.log(err);
    }
})

module.exports = router;