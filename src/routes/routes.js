const authRouter = require("./auth");
const middleWares = require("../middleware/index");

const router = require("express").Router();

router.use(authRouter)

router.get("/", (req, res) => {
    res.json({message: "Server is up and running"});
})

router.get("/admin", 
[
    middleWares.authenticationMiddleware.isAuthenticated
],
(req, res) => {
    res.json({message: "logged in"});
})

module.exports = router;