const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res.status(500).send({ message: "Ocorreu um erro no servidor" }),
    );
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "ID do usuário não encontrado" });
      }

      return res.status(200).send(user);
    })
    .catch(() =>
      res.status(500).send({ message: "Ocorreu um erro no servidor" }),
    );
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: "Erro ao criar usuário" }));
};

const updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error("Usuário não encontrado");
      error.statusCode = 404;
      return error;
    });
    return res.status(200).json({ data: user });
  } catch (err) {
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Dados inválidos fornecidos" });
    }
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error("Usuário não encontrado");
      error.statusCode = 404;
      return error;
    });
    return res.status(200).json({ data: user });
  } catch (err) {
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ messagew: "URL do avatar inválida" });
    }
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
