require('dotenv/config');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use(express.json());
app.use(express.json({ extended: true }));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.use('/ping', (req, res) => {
  res.status(200).json({
    appName: 'API',
    version: process.env.npm_package_version,
    status: 'Reallly good!!',
  });
});

require('./routes/character.routes')(app);

app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  console.error('hit the error middleware!');
  if (!error.statusCode) error.statusCode = 500;

  // if (error.statusCode === 301) {
  //   return res.status(301).redirect('/not-found');
  // }

  return res.status(error.statusCode).json({ error: error.toString() });
});

server.listen(PORT, (error) => {
  if (error) {
    console.log(`
    \n\n
    Server Listening!

    API:

    Status: Error
    Log: ${error}
    \n\n

    `);
  } else {
    console.log(`
    \n\n

    API server running on port ${PORT}

      \n\n
    `);
  }
});
