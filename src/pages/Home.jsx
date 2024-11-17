import React from "react";
import backgroundImage from "../assets/front_page.jpeg";

const Home = ({ isConnected }) => {
  return (
    <div>
      <section
        className="frontpage"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw"
        }}
      ></section>

      {isConnected && <div>Connected !!!</div>}
    </div>
  );
};

export default Home;
