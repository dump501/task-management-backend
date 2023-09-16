const jwt = require("jsonwebtoken");
const HttpStatus = require("../helpers/HttpStatus");
const Message = require("../helpers/Message");
const { generateTokens, verifyRefreshToken } = require("../helpers/helper");
const User = require("../models/User");
const UserService = require("../services/UserService");
const bcrypt = require("bcryptjs");
const { secret, accessTokenExpiresIn } = require("../../config/auth.config");
const { sendMail } = require("../services/EmailService");

const login = async (req, res) => {
  try {
    let userService = new UserService();
    const { email, password } = req.body;

    const result = await userService.findOneByfield("email", email);
    if (result) {
      let user = new User();
      user.fromJson(result);
      if (bcrypt.compareSync(password, user.password)) {
        const { accessToken, refreshToken } = generateTokens(result);

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
          data: {
            user: user.serialize(),
            accessToken,
          },
        });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.internalError).json({ error: Message.serverError });
  }
};

const register = async (req, res) => {
  // TODO: validate email
  try {
    let userService = new UserService();
    const { name, email, password } = req.body;

    const result = await userService.save({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      role_id: 2,
    });
    if (result) {
      sendMail({
        to: email,
        subject: "Task manager registration",
        html: "Welcome on Task manager",
      });
      return res.json({ message: "User registrated successfully" });
    }
    return res
      .status(HttpStatus.internalError)
      .json({ message: Message.serverError });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.internalError).json({ error: Message.serverError });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt;
    const { decoded } = verifyRefreshToken(refreshToken);
    const payload = { id: decoded?.id };
    const accessToken = jwt.sign(payload, secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: accessTokenExpiresIn,
    });
    res.json({ data: { accessToken } });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.internalError).json({ error: Message.serverError });
  }
};

module.exports = {
  login,
  register,
  refreshToken,
};
