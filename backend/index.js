const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const responseTime = require('response-time');
const path = require('path');
const routes = require('./routes/index');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(responseTime());

app.use('/api/v1', routes);
app.use(express.static(path.join(__dirname, '../frontend')));

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((err, req, res, next) => res.sendStatus(err.code || 500));

app.listen(PORT, () => console.log(`APP is listening on port: ${PORT}`));

