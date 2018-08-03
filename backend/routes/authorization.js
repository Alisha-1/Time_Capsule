const router = require('express').Router();
const pgDatabase = require('../lib/pg-database');
const {InvalidRequestError, UnauthorizedError} = require('../lib/errors');
const {isEmpty} = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const SALT_ROUNTS = 10;

router.post('/register', async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (isEmpty(email) || isEmpty(password)) {
      next(new InvalidRequestError());
    } else {
      const passwordHash = await bcrypt.hash(password, SALT_ROUNTS);
      const query = 'INSERT INTO time_capsule.user(email, password) VALUES ($1, $2)';
      await pgDatabase.task(t => t.none(query, [email, passwordHash]));
      res.status(201).json({
        success: true
      })
    }
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (isEmpty(email) || isEmpty(password)) {
      throw new InvalidRequestError();
    }
    await pgDatabase.task(async t => {
      const user = await t.oneOrNone(
          'SELECT u.password as password_hash FROM time_capsule.user as u WHERE lower(u.email) = lower($1)',
          [email]
      );
      const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
      if (isPasswordCorrect) {
        const user = await t.oneOrNone(
          'SELECT u.email, u.id FROM time_capsule.user as u WHERE lower(u.email) = lower($1)',
          [email]
        );
        const token = await jwt.createToken(user);
        res.status(200).json({
          success: true,
          payload: {
            token
          }
        });
      } else {
        next(new UnauthorizedError());
      }
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
