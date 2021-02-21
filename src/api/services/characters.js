import { bulkAdd } from '../controllers/character.controller';

export const getCharactersFromExternal = async () => {
  const charactersArray = [
    { name: 'Rick', trait: 'fun' },
    { name: 'Morty', trait: 'wild' },
    { name: 'Goon', trait: 'nutty' },
  ];

  bulkAdd(charactersArray);
};
