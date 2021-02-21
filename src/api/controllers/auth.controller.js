import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sessionSecret } from '../config';

export const signup = (req, res) => {
  console.log('signup: req.body = ', req.body);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: err });
      return;
    }

    console.log('going to save user: ', user);
    const token = makeToken(user);

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  });
};

export const login = (req, res) => {
  console.log('login: req.body = ', req.body);
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      console.log('login: user not found!');
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      console.log('password invalid!');
      return res.status(401).send({
        token: null,
        message: 'Invalid Password!',
      });
    }

    const token = makeToken(user);

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  });
};

function makeToken(user) {
  return jwt.sign({ id: user.id }, sessionSecret, {
    expiresIn: 86400,
  });
}
