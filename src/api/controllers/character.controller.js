import { Character } from '../models/character.model';

// Retrieve all characters from the database.
export const findAll = (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ').pop();
  }

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
    .then(function (characters) {})
    .catch(function (err) {
      console.error(err);
    });
};
