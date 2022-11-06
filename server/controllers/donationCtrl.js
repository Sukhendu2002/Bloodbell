const Donation = require("../models/donationModel");

exports.addDonation = async (req, res) => {
  const { bloodBank, donor, date, time } = req.body;
  try {
    //check if user has a pending donation
    const pendingDonation = await Donation.findOne({
      donor: donor,
      status: "Pending",
    });
    if (pendingDonation) {
      return res.status(400).json({
        message: "You already have a pending donation",
      });
    }

    const donation = await Donation.create({
      bloodBank,
      donor,
      date,
      time,
    });
    res.status(201).json({
      status: "success",
      donation,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({
      status: "success",
      donations,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getDonationbyId = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    res.status(200).json({
      status: "success",
      donation,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
