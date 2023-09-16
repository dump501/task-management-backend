const authRouter = require("./auth");
const middleWares = require("../middleware/index");

const router = require("express").Router();
const adminRouter = require("./admin")

router.use(authRouter)

router.get("/", (req, res) => {
    res.json({message: "Server is up and running"});
})

router.use("/admin", [
    middleWares.authenticationMiddleware.isAuthenticated
], adminRouter)

router.get("/admin", 
[
    middleWares.authenticationMiddleware.isAuthenticated
],
(req, res) => {
    res.json({message: "logged in"});
})

module.exports = router;