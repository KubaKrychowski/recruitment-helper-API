const express = require('express');
const router = express.Router();

router.get('/', (req,res,err) => {
    res.send('RECRUTATIONS');
});

module.exports = router;