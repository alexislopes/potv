const mongoose = require("mongoose");

const User = mongoose.model("User");

async function create(user) {
  return await User.create(user);
}

async function findById(id) {
  return await User.findById({ _id: id });
}

async function findByEmail(email) {
  const user = await User.findOne({ email: email });
  console.log("user: ", user);
  return user;
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

async function update(id, user) {
  return await User.findByIdAndUpdate(id, user);
}

module.exports = { create, findById, findByEmail, deleteUser, update };
