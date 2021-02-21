import { User } from '../models/user.model';

// Create and Save a new User
export const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const user = new User({
    name: req.body.name,
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

export const update = (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: 'User was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      });
    });
};

export const info = () => {
  res.json({ info: 'dummy user info' });
};
