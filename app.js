const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());

app.use("/users", usersRouter);
app.use((req, res, next) => {
  req.user = {
    _id: "6ab44a4a107946edbbca5c63",
  };

  next();
});
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
