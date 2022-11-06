const mongoose = require("mongoose");

const DonationModel = new mongoose.Schema({
  bloodBank: {
    type: Array,
    required: [true, "Please provide blood bank details"],
  },
  donor: {
    //its a user id
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide donor details"],
  },
  date: {
    type: String,
    required: [true, "Please provide a date"],
  },
  time: {
    type: String,
    required: [true, "Please provide a time"],
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const Donation = mongoose.model("Donation", DonationModel);
module.exports = Donation;
