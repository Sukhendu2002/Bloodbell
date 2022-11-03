const Router = require("express").Router;
const router = Router();

const { signup, login, validStatus } = require("../controllers/userCtrl");

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/validStatus").post(validStatus);

module.exports = router;
