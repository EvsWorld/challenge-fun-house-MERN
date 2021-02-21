import { Character } from '../models/character.model';

// Retrieve all characters from the database.
export const findAll = (req, res) => {
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

// BulkUpserts characters checking on the name field to not add characters already in db
export const bulkAdd = (arrayToBulkAdd) => {
  const bulkOps = arrayToBulkAdd.map((doc) => ({
    updateOne: {
      filter: { name: doc.name },
      update: doc,
      upsert: true,
    },
  }));

  Character.bulkWrite(bulkOps)
    .then(function (characters) {
      console.log(
        'got characters from rick and morty api and saved in db. characters = ',
        characters
      );
    })
    .catch(function (err) {
      console.error(err);
    });
};
