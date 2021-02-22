import axios from 'axios';
import { bulkAdd } from '../controllers/character.controller';

export const getCharactersFromExternal = async () => {
  // TODO: Crawl through api to get all users at this point, or a paginated
  // loading solution
  const fetchCharacters = async () => {
    try {
      const result = await axios.get(
        ' https://rickandmortyapi.com/api/character'
      );
      console.log('characters fetched from R&M: >> ', result.data);
      return result.data.results;
    } catch (error) {
      console.error(error);
    }
  };

  const characters = await fetchCharacters();

  bulkAdd(characters);
  const charactersArray = [
    { name: 'Rick', status: 'fun' },
    { name: 'Morty', status: 'wild' },
    { name: 'Jerry', status: 'nutty' },
  ];
};
