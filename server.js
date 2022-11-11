const express = require("express");

const app = express();

const PORT = 3000;

const usersRouter = require("./routes/users.router");

const showsRouter = require("./routes/shows.router");

app.use(express.json());

app.use("/users", usersRouter);

app.use("/shows", showsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
