const express = require("express");

const usersRouter = express.Router();

const { Sequelize } = require("sequelize");

const { Show, User } = require("../models");

const { param, validationResult } = require("express-validator");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll();

  res.send(users);
});

usersRouter.get(
  "/:id",
  param("id").custom(async (value, { req }) => {
    return User.findByPk(req.params.id).then((user) => {
      if (user === null) {
        return Promise.reject("User does not exist");
      }
    });
  }),
  async (req, res) => {
    const errors = validationResult(req).array({ onlyFirstError: true });

    if (errors.length > 0) {
      res.send(errors[0].msg);
    } else {
      const user = await User.findByPk(req.params.id);

      res.send(user);
    }
  }
);

module.exports = usersRouter;
