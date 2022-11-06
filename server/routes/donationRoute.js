const Router = require("express").Router;
const router = Router();

const { addDonation } = require("../controllers/donationCtrl");

router.route("/addDonation").post(addDonation);

module.exports = router;
