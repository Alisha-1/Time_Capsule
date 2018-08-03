require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const responseTime = require('response-time');
const path = require('path');
const routes = require('./routes/index');
const cors = require('cors');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(responseTime());
app.use(cors());

app.use('/api/v1', routes);
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const code = err.code || 500;
  res
    .status(code)
    .json({
      success: false,
      message: err.message,
      code
    });
});

app.listen(PORT, () => console.log(`APP is listening on port: ${PORT}`));

