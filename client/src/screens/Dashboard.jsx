import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (<div className="container-fluid container">
     <div>  <div class="row">
    <div class="col-sm">
    <Card />
    </div>
    <div class="col-sm">
        <Card />
    </div>
    <div class="col-sm">
    <Card />
    </div>
  </div>
      
        
     </div>

  </div>);
};

export default Dashboard;
