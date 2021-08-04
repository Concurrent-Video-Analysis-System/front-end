const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const success = (res) => {
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
};

const failed = (res) => {
  res.status(400);
  res.json({
    code: -1,
    message: "用户名或密码错误",
  });
};

app.post("/login", (req, res) => {
  console.log("received:", req.body);
  failed(res);
});

app.listen(12345, () => {
  console.log("listen on port 12345");
});
