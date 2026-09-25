const Card = require("../models/card");
const mongoose = require("mongoose");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json({ data: cards });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno ao buscar "cards" ' });
  }
};

const createCard = async (req, res) => {
  try {
    console.log(req.user._id);

    const { name, link } = req.body;

    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    return req.status(201).json({ data: card });
  } catch {
    if (error.name === "ValidationError") {
      return res.status().json({
        message: 'Dados invalidos ao tentar criar "card"',
        details: error.message,
      });
    }
    return res.status(500).json({ message: 'Erro interno ao criar "cards" ' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ message: "Formato de ID invalido " });
    }
    const card = await Card.findByIdAndDelete(cardId).orFail(() => {
      const error = new Error('"Card" não encontrado com o ID fornecido.');
      error.statusCode = 404;
      return error;
    });

    if (!card) {
      return res
        .status(404)
        .json({ message: '"Card" não encontrado com o ID fornecido' });
    }
    return res.status(200).json({ message: '"Card" removido com sucesso!' });
  } catch (err) {
    if (err.statusCode === 404 || err.name === "DocumentNotFoundError") {
      return res
        .status(404)
        .json({ message: err.name || '"Card" não encontrado' });
    }
    if (err.name === "CastError" || err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Identificador ou dados com formato inválido" });
    }

    return res.status(500).json({ message: 'Erro interno ao deletar "card"' });
  }
};
const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => {
      const error = new Error("Cartão não encontrado para curtir");
      error.statusCode = 404;
      return error;
    });
    return res.status(200).json({ data: card });
  } catch (err) {
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ message: "Formato de ID do cartão inválido" });
    }
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => {
      const error = new Error("Cartão não encontrado para descurtir");
      error.statusCode = 404;
      return error;
    });
    return res.status(200).json({ data: card });
  } catch (err) {
    if (err.statusCode === 404) {
      return res.status(404).json({ message: err.message });
    }
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ message: "Formato de ID do cartão inválido" });
    }
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
