const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const cardsPath = path.join(__dirname, '../data/cards.json');

const getCards = (req, res) => {
  fs.readFile(cardsPath, 'utf-8')
    .then((data) => {
      const cards = JSON.parse(data);
      return res.status(200).send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Ocorreu um erro no servidor' }));
};

router.get('/', getCards);

module.exports = router;
