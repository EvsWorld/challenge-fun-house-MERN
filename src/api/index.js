const Express = require('express');
const Cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = Express();
const server = require('http').Server(app);

app.use(Cors());
app.use('/ping', (req, res) => {
  res.status(200).json({
    appName: 'API',
    version: process.env.npm_package_version,
    status: 'OK!!!!',
  });
});

app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

server.listen(PORT, (error) => {
  if (error) {
    console.log(`
    \n\n
    PONG!

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
