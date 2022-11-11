const express = require("express");

const usersRouter = express.Router();

const { Sequelize } = require("sequelize");

const { Show, User } = require("../models");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll();

  res.send(users);
});

module.exports = usersRouter;
