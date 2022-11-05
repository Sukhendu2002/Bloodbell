import React from 'react';
import "./Tabs.css";
import Card from "./Card";

const Tabs = () => {
  return (
    <div className="tabs" style={{
        width: "20rem",
        margin: "auto",
        position: "relative",
    }}>
  <input type="radio" className="tabs__radio" name="tabs-example" id="tab1" checked />
  <label for="tab1" className="tabs__label">Responses</label>
  <div className="tabs__content">
  <Card />
  </div>
  <input type="radio" className="tabs__radio" name="tabs-example" id="tab2" />
  <label for="tab2" className="tabs__label">Posts</label>
  <div className="tabs__content">
    <Card />
  </div>
  <input type="radio" className="tabs__radio" name="tabs-example" id="tab3" checked />
  <label for="tab3" className="tabs__label">History</label>
  <div className="tabs__content">
  <Card />
  <Card />
  </div>
</div>
  )
}

export default Tabs;
