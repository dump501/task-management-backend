const authRouter = require("./auth");
const middleWares = require("../middleware/index");

const router = require("express").Router();
const v1Router = require("./v1");
const v1adminRouter = require("./v1admin");
const { sendMail } = require("../services/EmailService");

router.use(authRouter);

router.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

router.use(
  "/api/v1",
  [middleWares.authenticationMiddleware.isAuthenticated],
  v1Router
);

router.use(
  "/api/v1/admin",
  [
    middleWares.authenticationMiddleware.isAuthenticated,
    middleWares.authorizationMiddleware.isAdmin,
  ],
  v1adminRouter
);

router.get("/mail", (req, res) => {
  try {
    sendMail();
  } catch (error) {
    console.log(error);
  }
  return res.json({ message: "Email sended successfully" });
});

module.exports = router;
