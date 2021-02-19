import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { connectDb } from './models';
import routes from './routes';

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ extended: true }));


app.use('/ping', (req, res) => {
  res.status(200).json({
    appName: 'API',
    version: process.env.npm_package_version,
    status: 'Reallly good!!',
  });
});

app.use('/api/characters', routes.character);
app.use('/api/users', routes.user);
// app.use('/messages', routes.message);

app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  console.error('hit the error middleware! error = ', error);
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

connectDb().then(async () => {

app.listen(PORT, (error) => {
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

})