const router = require('express').Router();
const servicePayment = require('../services/servicePayment');

router.post('/', async (req, res, next) => {
    try {
        const { id } = req.body;
        const response = await servicePayment.Payment(id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;