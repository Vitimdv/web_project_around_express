const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const usersPath = path.join(__dirname, '../data/users.json');

const getUsers = (req, res) => {
  fs.readFile(usersPath, 'utf-8')
    .then((data) => {
      const users = JSON.parse(data);
      return res.status(200).send(users);
    })
    .catch(() => res.status(500).send({ message: 'Ocorreu um erro no servidor' }));
};

const getUserById = (req, res) => {
  const { id } = req.params;

  fs.readFile(usersPath, 'utf-8')
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((currentUser) => currentUser._id === id);

      if (!user) {
        return res.status(404).send({ message: 'ID do usuário não encontrado' });
      }

      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Ocorreu um erro no servidor' }));
};

router.get('/', getUsers);
router.get('/:id', getUserById);

module.exports = router;
