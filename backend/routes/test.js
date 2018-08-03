const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json({
    success: true,
    payload: 'example'
  })
});

module.exports = router;
