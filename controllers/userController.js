const UserModel = require("../models/user");

exports.createUser = async (req, res) => {
  await UserModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  return res.status(201).json({ message: "User Created" });
};

exports.getAllUsers = async (req, res) => {
  const allUsers = await UserModel.find({});

  return res.json(allUsers);
};

exports.getById = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  return res.json(user);
};

exports.updateUser = async (req, res) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  return res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);

  return res.json({ message: "User Deleted" });
};
