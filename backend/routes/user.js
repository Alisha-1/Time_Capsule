const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send("it's user router");
});


module.exports = router;
