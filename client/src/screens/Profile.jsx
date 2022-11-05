import React from 'react';
import Intials from '../components/Intials';

import { BsPencilSquare } from 'react-icons/Bs';
import Tabs from "../components/Tabs";
const Profile = () => {
  return (
    <div className='container-fluid'><div class="row">
    <div class="col">
      <Intials />
      <Intials />
      <Intials />
    </div>
    <div class="col">
      <div><img src="../public/images/profile.png" alt="" style={{
       height: "17rem",
       width: "17rem",
       margin: "5rem",
       marginright: "2rem",
       border: "solid"
      }} />
      <div style={{
       position: "relative",
       left: "80px",
       bottom: "50px"
      }}>
      <button className='btn' style={{
        fontSize: "2rem",
        border: "dashed",
        width: "17rem"
      }}><BsPencilSquare />edit</button>
      </div>
      </div>
    </div>
    </div>
    
      <Tabs />
 
    </div>
  )

  
}

export default Profile;