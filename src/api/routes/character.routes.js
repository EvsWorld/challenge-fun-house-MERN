module.exports = (app) => {
  const characters = require('../controllers/character.controller');

  var router = require('express').Router();

  router.post('/', characters.create);
  router.get('/', characters.findAll);
  router.put('/:id', characters.update);

  app.use('/api/characters', router);
};
