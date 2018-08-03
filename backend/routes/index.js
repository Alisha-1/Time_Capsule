const router = require('express').Router();
const authorization = require('./authorization');
const {isAuthenticated} = require('../lib/authorization');
const test = require('./test');

router.use('/authorization', authorization);
router.use(isAuthenticated);
router.use('/test', test);

module.exports = router;
