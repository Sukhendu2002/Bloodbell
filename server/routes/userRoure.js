const Router = require("express").Router;
const router = Router();

const { signup, login } = require("../controllers/userCtrl");

router.route("/signup").post(signup);

router.route("/login").post(login);

module.exports = router;
