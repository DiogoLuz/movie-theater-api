const express = require("express");

const { Show, User } = require("../models");

async function checkUser(req, res, next) {
  const user = await User.findByPk(req.params.userid);

  if (user === null) {
    res.status(404).send("User is not found");
  } else {
    next();
  }
}

async function checkShow(req, res, next) {
  const show = await Show.findByPk(req.params.showid);

  if (show === null) {
    res.status(404).send("Show is not found");
  } else {
    next();
  }
}

module.exports = { checkUser, checkShow };
