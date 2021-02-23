const jwt = require('jsonwebtoken');
import { sessionSecret } from '../config';
import { User } from '../models/user.model';

export const verifyToken = (req, res, next) => {
  const token =
    req.headers['x-access-token'] && JSON.parse(req.headers['x-access-token']);

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, sessionSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.user = decoded;
    next();
  });
};

export const checkForUsedUsernameOrEmail = async (req, res, next) => {
  try {
    const foundUsername = await User.findOne({
      username: req.body.username,
    });
    if (foundUsername) {
      res.status(400).send({ message: 'Failed! Username is already in use!' });
      return;
    }
    const foundEmail = await User.findOne({
      username: req.body.username,
    });

    if (foundEmail) {
      res.status(400).send({ message: 'Failed! Username is already in use!' });
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }

  // User.findOne({
  //   username: req.body.username,
  // }).exec((err, user) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   if (user) {
  //     res.status(400).send({ message: 'Failed! Username is already in use!' });
  //     return;
  //   }

  // Email
  // User.findOne({
  //   email: req.body.email,
  // }).then((err, user) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   if (user) {
  //     res.status(400).send({ message: 'Failed! Email is already in use!' });
  //     return;
  //   }
  // });
  // });
  next();
};
