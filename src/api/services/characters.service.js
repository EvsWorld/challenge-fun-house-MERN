import { bulkAdd } from '../controllers/character.controller';

export const getCharactersFromExternal = async () => {
  // TODO: fetch characters from R&M api
  const charactersArray = [
    { name: 'Rick', trait: 'fun' },
    { name: 'Morty', trait: 'wild' },
    { name: 'Goon', trait: 'nutty' },
  ];

  bulkAdd(charactersArray);
};
