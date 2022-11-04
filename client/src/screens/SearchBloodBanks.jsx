import React, { useEffect, useState } from "react";
import Select from "react-select";
import { State, City } from "country-state-city";

const SearchBloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [search, setSearch] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [statesCode, setStatesCode] = useState("");

  const states = State.getStatesOfCountry("IN");
  let cities = City.getCitiesOfState("IN", statesCode);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    cities = City.getCitiesOfState("IN", statesCode);
    console.log(statesCode);
  }, [statesCode]);

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
              setStatesCode(e.target.value.isoCode);
            }}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option value={state}>{state.name}</option>
            ))}
          </select>
        </div>
        <div className="col-3"></div>
        <div className="col-3"></div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default SearchBloodBanks;
