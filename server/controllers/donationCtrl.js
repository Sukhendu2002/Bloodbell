const Donation = require("../models/donationModel");
const User = require("../models/userModel");

exports.addDonation = async (req, res) => {
  const { bloodBank, donor, date, time } = req.body;
  try {
    //check if user has a pending donation
    const pendingDonation = await Donation.findOne({
      donor: donor,
      status: "Pending" || "Accepted",
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

exports.getDonationbyUserIds = async (req, res) => {
  const { userIds } = req.body;
  try {
    const donations = await Donation.find({ donor: { $in: userIds } });
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

exports.updateDonation = async (req, res) => {
  const { donorId, status } = req.body;
  try {
    const donation = await Donation.findOneAndUpdate(
      { donor: donorId },
      { status },
      { new: true }
    );
    if (status === "Completed") {
      await User.findOneAndUpdate(
        { _id: donorId },
        { $inc: { donationCount: 1 } },
        {
          $set: { lastDonated: Date.now() },
        }
      );
    }
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
