const mdb = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterSchema = new mdb.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  EmailId: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  JoinDate: {
    type: Date,
    default: new Date(),
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

RegisterSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.TOKEN_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error, "token generate error.");
  }
};

RegisterSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    const PasswordHash = await bcrypt.hash(this.Password, 10);
    this.Password = PasswordHash;
  }
  next();
});

const Register = new mdb.model("UsersData", RegisterSchema);
module.exports = Register;
