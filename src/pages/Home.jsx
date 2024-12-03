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
          width: "100vw",
          position: "relative",
        }}
      >
        <iframe
          src="https://www.thedigitalassetblueprint.com/token-compass-home-webapp/"
          title="Token Compass"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </section>
    </div>
  );
};

export default Home;
