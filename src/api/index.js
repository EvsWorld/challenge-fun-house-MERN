import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { connectDb } from './models';
import routes from './routes';
import { getCharactersFromExternal } from './services/characters.service';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: 'Authorization',
};

// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE
// Access-Control-Allow-Headers: Authorization

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.json({ extended: true }));

app.use(
  morgan(':method :url  :req[header]  |   :response-time  |  :date[web]')
);

app.use('/ping', (req, res) => {
  res.status(200).json({
    appName: 'API',
    version: process.env.npm_package_version,
    status: 'Reallly good!!',
  });
});

// app.use((req, res, next) => {
//   res.header(
//     'Access-Control-Allow-Headers',
//     'x-access-token, Origin, Content-Type, Accept'
//   );
//   next();
// });

app.use('/api/characters', routes.character);
app.use('/api/users', routes.user);
app.use('/api/auth', routes.auth);

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
  // TODO: fetch characters from Rick and Morty api and save in characters db
  getCharactersFromExternal();

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
});
