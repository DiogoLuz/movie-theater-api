const express = require("express");

const app = express();

const PORT = 3000;

const usersRouter = require("./routes/users.router");

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
