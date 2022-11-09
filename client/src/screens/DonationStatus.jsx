import React, { useState, useEffect } from "react";
import axios from "axios";
import serevr from "../config/index";
import StatusCard from "../components/StatusCard";

const DonationStatus = () => {
  const [bloodBank, setBloodBank] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const replaceSpaceWithPlus = (str) => {
    return str.replace(/\s/g, "+");
  };
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${serevr}/api/donation/getDonationbyId`,
        {
          userIds: userId,
        },
        config
      )
      .then((res) => {
        setBloodBank(res.data.donations);
        console.log(res.data.donations);
        console.log(bloodBank);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid container">
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : bloodBank.length > 0 ? (
        bloodBank.map((bloodBank, index) => (
          <StatusCard
            key={index}
            name={bloodBank.bloodBank[1]}
            location={bloodBank.bloodBank[2]}
            email={bloodBank.bloodBank[4]}
            phone={bloodBank.bloodBank[3]}
            type={bloodBank.bloodBank[5]}
            status={bloodBank.status}
            date={bloodBank.date}
            time={bloodBank.time}
          />
        ))
      ) : (
        <h1>No Donation Request</h1>
      )}
    </div>
  );
};

export default DonationStatus;
