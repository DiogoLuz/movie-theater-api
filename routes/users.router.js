const express = require("express");

const usersRouter = express.Router();

const { Sequelize } = require("sequelize");

const { Show, User } = require("../models");

const { param, validationResult } = require("express-validator");

async function checkUser(req, res, next) {
  const user = await User.findByPk(req.params.id);

  if (user === null) {
    res.status(404).send("User is not found");
  } else {
    next();
  }
}

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll();

  res.send(users);
});

usersRouter.get("/:id", checkUser, async (req, res) => {
  const user = await User.findByPk(req.params.id);

  res.send(user);
});

module.exports = usersRouter;
