const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const kavenegar = require("kavenegar");

const UserModel = require("../models/userModel");
const {
  loginValidator,
  registerValidator,
} = require("../validators/UserValidator");
const { loginMiddleware } = require("../middleware/authMiddleware");

router.post("/api/login", async (req, res) => {
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).send(error.message);
  const user = await UserModel.findOne({ phone: req.body.phone });
  if (!user) return res.status(404).send({ message: "User not found" });
  const userChecked = await bcrypt.compare(req.body.password, user.password);
  if (!userChecked)
    return res.status(400).send({ message: "password is incorrect" });
  const data = {
    _id: user.id,
    name: user.name,
    role: user.role,
  };
  const token = jwt.sign(data, config.get("iwtPrivateKye"));
  res.status(200).send({ message: token });
});

router.post("/api/register", async (req, res) => {
  const { error } = registerValidator(req.body);
  if (error) return res.status(404).send(error.message);
  const user = await UserModel.findOne({ phone: req.body.phone });
  if (user) return res.status(400).send("phone exists");
  // const newUser = new UserModel({
  //     name: req.body.name,
  //     phone: req.body.phone,
  //     password: req.body.password,
  //     }
  // )

  const newUser = new UserModel(
    _.pick(req.body, ["name", "phone", "password", "role"])
  );
  const salt = await bcrypt.genSaltSync(10);
  const pass = await bcrypt.hash(req.body.password, salt);
  newUser.password = pass;
  await newUser.save();
  res.status(201).send(_.pick(newUser, ["name", "phone"]));
});

router.post("/api/sendcode", loginMiddleware, async (req, res) => {
  const id = req.user._id;
  const user = await UserModel.findById(id);
  if (!user) return res.status(404).send({ message: "user not found" });
  const api = kavenegar.KavenegarApi({
    apikey:
      config.get("kavenegar_apiKey"),
  });
  const num = Math.floor(Math.random() * 10000 + 1000);
  api.Send(
    {
      message: `test code is ${num}`,
      sender: "1000596446",
      receptor: user.phone,
    },
    function (response, status) {
      console.log(response);
      console.log(status);
    }
  );
  res.send("ok");
});

module.exports = router;
