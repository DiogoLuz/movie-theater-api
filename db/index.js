const { Sequelize } = require("sequelize");

const { db } = require("./db");

const seed = require("./seed");

async function main() {
  await db.sync();
  seed();
}

main();
