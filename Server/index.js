require("dotenv").config();
const express = require("express");
const app = express();
const core = require("cors");
const bcrypt = require("bcrypt");
const cookieParse = require("cookie-parser");
const auth = require("./middleware/auth.js");
const Register = require("./database/model/register.js");

const PORT = process.env.PORT || 5000;

app.use(core());
app.use(express.json());
app.use(cookieParse());

require("./database/database.js");

app.post("/register", async (req, res) => {
  try {
    const RegisterUser = new Register({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Username: req.body.Username,
      EmailId: req.body.EmailId,
      Password: req.body.Password,
    });

    // token;
    const token = await RegisterUser.generateAuthToken();

    await RegisterUser.save();
    res.send({
      Message: "Register Successfully.",
      AccountCreated: true,
      Error: null,
    });
  } catch (error) {
    res.send({
      Message: "Register Failed.",
      AccountCreated: false,
      Error: error,
    });
  }
});

const EmailCheck = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const CheckPassword = async ({ getUser, Password, res, type }) => {
  if (getUser) {
    const isMatch = await bcrypt.compare(Password, getUser.Password);
    if (isMatch) {
      const token = await getUser.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 5000000),
        httpOnly: true,
      });
      res.send({
        IsLogin: true,
        LoginUser: getUser,
        Message: "User login successfully.",
        token: token,
      });
    } else {
      res.send({
        IsLogin: false,
        LoginUser: {},
        Message: `Invalid ${type} or Password..`,
        token: null,
      });
    }
  } else {
    res.send({
      IsLogin: false,
      LoginUser: {},
      Message: `Invalid ${type} or Password..`,
      token: null,
    });
  }
};

app.post("/login", async (req, res) => {
  try {
    const UserNameOrEmail = req.body.UsernameOrEmail;
    const Password = req.body.Password;
    if (EmailCheck(UserNameOrEmail)) {
      const getUser = await Register.findOne({
        EmailId: UserNameOrEmail,
      });
      const type = "Email Id";
      return CheckPassword({ getUser, Password, res, type });
    } else {
      const getUser = await Register.findOne({
        Username: UserNameOrEmail,
      });

      const type = "Username";
      return CheckPassword({ getUser, Password, res, type });
    }
  } catch (error) {
    res.send({
      IsLogin: false,
      LoginError: error,
      Message: `Login Failed`,
      token: null,
    });
  }
});

app.get("/", auth, (req, res) => {
  res.send("server is online");
});

app.get("/user", auth, (req, res) => {
  res.send({ user: req.user });
});

app.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tok) => {
      return tok.token !== req.token;
    });

    res.clearCookie("jwt");
    await req.user.save();
    res.render("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/logout/all", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    res.clearCookie("jwt");
    await req.user.save();
    res.render("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use((req, res) => {
  res.send("server online");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
