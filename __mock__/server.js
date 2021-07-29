const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.post("/login", (req, res) => {
  console.log("received:", req.body);
  res.status(200);
  res.json({
    code: 0,
    message: "success",
    user: {
      id: "123",
      username: "admin",
      token: "qwerty",
    },
  });
});

app.listen(12345, () => {
  console.log("listen on port 12345");
});
