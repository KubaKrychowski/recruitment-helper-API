const express = require('express');
const dbContext = require('../config/db-context');
const Recrutation = require('../models/recrutation');
const router = express.Router();

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
            isSalaryRanged: req.body.rangedSalary,
            minSalary: req.body.minSalary,
            maxSalary: req.body.maxSalary,
            employmentType: req.body.employmentType,
            comments: req.body.comments,
            externalId: req.body.externalId
        }

        const result = await Recrutation.create(recrutation);

        res.status(200).send({
            message: result
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/', async (req, res, err) => {
    try {
        await dbContext.sync();
        const result = await Recrutation.findAll();

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