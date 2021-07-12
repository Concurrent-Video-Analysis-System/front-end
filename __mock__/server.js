const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.post("/login", (req, res) => {
  console.log("received:", req.body);
  res.json({
    user: {
      id: "123",
      username: "admin",
      token: "qwerty",
    },
  });
});

app.listen(8888, () => {
  console.log("listen on port 8888");
});
