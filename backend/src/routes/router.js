const router = require('express').Router();
const routerOTP = require('./routerOTP');
const routerHealth = require('./routerHealth');
const routerUser = require('./routerUser');
const routerPayment = require('./routerPayment');
const webhook = require('./webhook');

const jwt = require('../utilities/jwt');
const errorLogger = require('../utilities/errorLogger');
const requestLogger = require('../utilities/requestLogger');

router.use(requestLogger);
router.use('/health', routerHealth);
router.use('/otp', routerOTP);
router.use('/webhook', webhook);
router.use(jwt.ValidateToken);
router.use('/user', routerUser);
router.use('/payment', routerPayment);

router.use(errorLogger);

module.exports = router;