const db = require('../models');
const Character = db.characters;

// Create and Save a new Character
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const character = new Character({
    name: req.body.name,
  });

  character
    .save(character)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Character.',
      });
    });
};

// Retrieve all characters from the database.
exports.findAll = (req, res) => {
  Character.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving characters.',
      });
    });
};
