// Home.jsx
import React from "react";

const Home = ({isConnected}) => {
  return (
   <div>
        <h2>Here we can add some content like</h2>
        {
            isConnected
            ? (
                <div>
                    <span>What do we want to show incas is logged</span>
                </div>
            )
            :''
        }
   </div> 
  )
};

export default Home;
