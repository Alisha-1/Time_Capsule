const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');
const SECRET = process.env.CSV_EXPORT_SECRET || 'test';
const TOKEN_CONFIG = {expiresIn: '1h'};

function verifyToken(token) {
  return new bluebird((resolve, reject) => {
    if(token) {
      jwt.verify(token, SECRET, (err, payload) => {
        if(err) {
          reject(err);
        } else {
          resolve(payload);
        }
      });
    } else {
      reject();
    }
  });
}

function createToken(payload) {
  return new bluebird((resolve, reject) => {
    jwt.sign(payload, SECRET, TOKEN_CONFIG, (err, token) => {
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

module.exports = {
  verifyToken,
  createToken
};
