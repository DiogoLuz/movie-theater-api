const express = require("express");

const usersRouter = express.Router();

const { Sequelize } = require("sequelize");

const { Show, User } = require("../models");

const { checkShow, checkUser } = require("./middleware");

const { param, validationResult } = require("express-validator");

//Get all users
usersRouter.get("/", async (req, res) => {
  const users = await User.findAll();

  res.send(users);
});
//Get a specific user from the database
usersRouter.get("/:userid", checkUser, async (req, res) => {
  const user = await User.findByPk(req.params.userid);

  res.send(user);
});

//Get all a specific user's watched shows

usersRouter.get("/:userid/shows", checkUser, async (req, res) => {
  const user = await User.findByPk(req.params.userid);

  res.send(user.getShows());
});

//Adding a show to a user

usersRouter.put(
  "/:userid/shows/:showid",
  checkUser,
  checkShow,
  async (req, res) => {
    const user = await User.findByPk(req.params.userid);
    const show = await Show.findByPk(req.params.showid);

    await show.setUser(user);

    res.send(show);
  }
);

module.exports = usersRouter;
