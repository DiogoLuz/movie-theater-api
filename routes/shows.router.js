const express = require("express");
const { Sequelize } = require("sequelize");
const { Show, User } = require("../models");

const { checkShow, checkUser } = require("./middleware");

const { body, validationResult } = require("express-validator");

const showsRouter = express.Router();

//Get all shows from database

showsRouter.get("/", async (req, res) => {
  const shows = await Show.findAll();

  res.send(shows);
});

//Get a specific show from database
showsRouter.get("/:showid", checkShow, async (req, res) => {
  const show = await Show.findByPk(req.params.showid);

  res.send(show);
});

//Get shows from a specific genre

showsRouter.get("/genres/:genre", async (req, res) => {
  const show = await Show.findAll({ where: { genre: req.params.genre } });

  res.send(show);
});

//Update rating for a specific show

showsRouter.put(
  "/:showid/watched",
  checkShow,
  body("rating").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
      res.status(411).send("Status PUT request cannot be empty");
    } else {
      const show = await Show.findByPk(req.params.showid);

      await show.update({ rating: req.body.rating });

      res.send(show);
    }
  }
);

//Update status on specific show

showsRouter.put(
  "/:showid/updates",
  checkShow,
  body("status").isLength({ min: 5, max: 25 }),
  async (req, res) => {
    const errors = validationResult(req).array();

    console.log(errors);

    if (errors.length > 0) {
      res
        .status(400)
        .send("Status needed or invalid length (needs to be 5-25 characters)");
    } else {
      const show = await Show.findByPk(req.params.showid);

      await show.update({ status: req.body.status });

      res.send(show);
    }
  }
);
module.exports = showsRouter;
