import React, { useEffect, useState } from "react";
import Select from "react-select";
import { State, City } from "country-state-city";
import axios from "axios";

const SearchBloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [search, setSearch] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [statesCode, setStatesCode] = useState("");
  const [searchBloodBanks, setSearchBloodBanks] = useState([]);

  const states = State.getStatesOfCountry("IN");
  const cities = City.getCitiesOfState("IN", statesCode);

  const endPoint = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYBLOODBANK&latitude=${latitude}&longitude=${longitude}`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    fetchBlood();
  }, [endPoint]);

  const fetchBlood = async () => {
    await axios
      .get(endPoint)
      .then((res) => {
        setBloodBanks(res.data.data);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    console.log(state, city, search);

    if (state != "" && city === "" && search === "") {
      bloodBanks.map((bloodBank) => {
        //check if bloodBank[1] has state in it
        if (bloodBank[2].includes(state)) {
          console.log(bloodBank);
        }
      });
    }
  };

  return (
    <div className="container-fluid container">
      <div className="row">
        <div className="col-12">
          <h1
            className="text-center"
            style={{
              fontFamily: "Roboto Condensed",
            }}
          >
            Nearest Blood Bank(BB)
          </h1>
        </div>

        <div className="col-12">
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <select
            className="form-control"
            onChange={(e) => {
              setState(e.target.value);
              const code = e.target.outerHTML
                .split(`value="${e.target.value}"`)[1]
                .split(" code=")[1]
                .split('"')[1];
              setStatesCode(code);
            }}
          >
            <option value="">Select State</option>

            {states.map((state, index) => (
              <option value={state.name} key={index} code={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <select
            className="form-control"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            <option value="">Select City</option>
            {
              //if the state is selected then only show the cities
              statesCode && (
                <React.Fragment>
                  {cities.map((city, index) => (
                    <option value={city.name} key={index}>
                      {city.name}
                    </option>
                  ))}
                </React.Fragment>
              )
            }
          </select>
        </div>
        <div className="col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Blood Bank or Hospital Name"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div
          className="col-2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 ">
          <h3 className="text-center">Blood Banks</h3>
          <hr />
        </div>

        <div className="col-12">
          {bloodBanks.length == 0 ? (
            <h3 className="text-center">No Blood Banks Found</h3>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Blood Bank Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Email</th>
                  <th scope="col">Category</th>
                  <th scope="col">Distance(Km)</th>
                </tr>
              </thead>
              <tbody>
                {bloodBanks.map((bloodBank, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{bloodBank[1]}</td>
                    <td>{bloodBank[2]}</td>
                    <td>{bloodBank[3]}</td>
                    <td>
                      {bloodBank[4] == "" ? "Not Available" : bloodBank[4]}
                    </td>
                    <td>{bloodBank[5]}</td>
                    <td>{bloodBank[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBloodBanks;
