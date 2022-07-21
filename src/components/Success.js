import React from "react";
import { Link, withRoute } from "react-router-dom";
import reactGA from "react-ga4";
import { useEffect } from "react";

reactGA.initialize("G-R0371QD07B");
function Success(props) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    reactGA.pageview(window.location.pathname + window.location.search);
  });
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

export default withRoute(Success);
