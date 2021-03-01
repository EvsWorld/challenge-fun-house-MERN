import axios from 'axios';
import { Character } from '../models/character.model';

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

export const getCharactersFromExternal = async () => {
  const fetchCharacters = async () => {
    try {
      const result = await axios.get(
        ' https://rickandmortyapi.com/api/character'
      );
      return result.data.results;
    } catch (error) {
      console.error(error);
    }
  };

  const characters = await fetchCharacters();

  bulkAdd(characters);
};
