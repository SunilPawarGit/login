import React from "react";
import { Link } from "react-router-dom";
function Success(props) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="text-center">
      <h1>
        You logged in as{" "}
        {capitalize(
          !sessionStorage.getItem("userType")
            ? "guest"
            : sessionStorage.getItem("userType")
        )}
      </h1>
      <Link to="/" className="btn btn-primary">
        Sign Out
      </Link>
    </div>
  );
}

export default Success;
