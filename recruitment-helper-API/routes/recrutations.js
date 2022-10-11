const express = require('express');
const dbContext = require('../config/db-context');
const Recrutation = require('../models/recrutation');
const router = express.Router();
const auth = require("../middleware/auth");
const syncDb = require('../middleware/syncDb');
router.post('/', async (req, res, err) => {
    try {
        await dbContext.sync();

        const recrutation = {
            companyName: req.body.companyName,
            companyDescription: req.body.companyDescription,
            position: req.body.position,
            recruitersName: req.body.recruitersName,
            websiteUrl: req.body.websiteUrl,
            workType: req.body.workType,
            workLanguage: req.body.workLang,
            recrutationLanguage: req.body.recrutationLanguage,
            meetingDateAndHour: req.body.meetingDateAndHour,
            isSalaryRanged: !!req.body.rangedSalary,
            minSalary: req.body.minSalary,
            maxSalary: req.body.maxSalary,
            employmentType: req.body.employmentType,
            comments: req.body.comments,
            externalId: req.body.externalId,
            userExternalId: req.body.userExternalId,
        }

        const result = await Recrutation.create(recrutation);

        res.status(200).send({
            message: result
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/:userExternalId', auth, async (req, res) => {
    try {
        const recrutations = await Recrutation.findAll(
            { where: 
                { userExternalId: req.params.userExternalId } });

        if(!recrutations){
            res.status(404).json({
                error: 'not found'
            })
        };

        res.status(200).json({
            message: recrutations
        });
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:recrutationExternalId', auth, syncDb, async (req,res) => {
    try {
        await Recrutation.destroy({
            where: {
                externalId: req.params.recrutationExternalId
            }
        });

        res.status(200).send({
            message: 'Recrutation successfuly deleted'
        });
    } catch (err) {
        res.status(err.status).json({
            error: err
        })
    }
}); 

router.get('/', auth, syncDb, async (req, res, err) => {
    try {
        const result = await Recrutation.findAll();

        if(!result){
            res.status(404).json({
                err: 'not found'
            });
        }

        res.status(200).send({
            message: result
        });
    } catch (err) {
        console.log(err);
    }
})

router.get('/migrate', async (req, res, err) => {
    dbContext.sync();
    await Recrutation.sync({ alter: true });
    try {
        res.status(200).send({
            message: `Recrutations table has been updated`
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: 'Database Error'
        })
    }
});

module.exports = router;