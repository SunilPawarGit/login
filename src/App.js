import "./App.css";
import Signup from "./components/Signup";
import React, { useState } from "react";
import Alert from "./components/Alert";
import Signin from "./components/Signin";
import { Routes, Route } from "react-router-dom";
import Success from "./components/Success";
function App() {
  const [alert, setAlert] = useState(null);
  const [type, isType] = useState("");
  const showAlert = (message) => {
    setAlert({
      msg: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const setAuth = (uType) => {
    sessionStorage.setItem("userType", uType);
  };
  return (
    <>
      <Alert alert={alert} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Signin
              type={type}
              showAlert={showAlert}
              setAuth={setAuth}
              isType={isType}
            />
          }
        />
        <Route
          exact
          path="/signup"
          element={<Signup showAlert={showAlert} isType={isType} />}
        />
        <Route
          exact
          path="/success"
          element={<Success type={type} isType={isType} setAuth={setAuth} />}
        />
      </Routes>
    </>
  );
}

export default App;
