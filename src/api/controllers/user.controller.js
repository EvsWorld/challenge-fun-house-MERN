import { User } from '../models/user.model';

export const update = (req, res) => {
  console.log('userController.update: req.body :>> ', req.body);
  console.log('userController.update: req.user :>> ', req.user);
  // const id = req.params.id
  const id = req.user.user['_id'];

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((data) => {
      console.log('userController.update: data passed after update: ', data);
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else
        res.send({
          message: 'User was updated successfully.',
          user: {
            favoriteCharacters: data.favoriteCharacters,
          },
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      });
    });
};

export const info = (req, res) => {
  const id = req.user.user['_id'];

  User.findById(id).exec((err, user) => {
    console.log('info: found user: ', user);
    console.log({ user, err });
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      console.log('info: user not found!');
      return res.status(404).send({ message: 'User Not found.' });
    }

    res.status(200).send({
      user: {
        username: user.username,
        email: user.email,
        favoriteCharacters: user.favoriteCharacters,
      },
    });
  });
};
