import React from "react";
import { Link } from "react-router-dom";
const Logout = ({ state }) => {
  return (
    <>
      <div className="rl_f">
        <h1>Login Again!!</h1>
        <p className="btl">
          <Link to="/login">back to login</Link>
        </p>
      </div>
    </>
  );
};

export default Logout;
