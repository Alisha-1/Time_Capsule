const jwt = require('./jwt');
const {IncorrectTokenError, UnauthorizedError} = require('./errors');

async function isAuthenticated(req, res, next) {
  try {
    const token = req.query.token || req.body.token || getTokenFromHeader(req.headers.authorization)
    const results = await jwt.verifyToken(token);
    if (results) {
      next();
    } else {
      next(new UnauthorizedError());
    }
  } catch (err) {
    next(err);
  }
}

function getTokenFromHeader(header = '') {
  if (!header.startsWith('Bearer ')) {
    throw new IncorrectTokenError();
  }
  return header.replace('Bearer ');
}

module.exports = {
  isAuthenticated
};
