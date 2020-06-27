const express = require("express");
const app = express();
const PORT = 9000;
let users = { phil: "pass" };

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  users[username] = password;
  res.send("user created");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password && users[username] == password) {
    res.send("credentials correct");
  } else {
    res.send("incorrect credentials");
  }
});

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
