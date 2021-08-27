import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/profile">
        <span>Profile</span>
      </Link>
      <div>hello from home</div>
    </>
  );
};

export default Home;
