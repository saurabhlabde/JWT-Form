const jwt = require("jsonwebtoken");
const { model, models } = require("mongoose");
const Register = require("../database/model/register.js");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await Register.findOne({
      _id: verifiedUser._id,
    });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = auth;
