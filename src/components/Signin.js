import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/users";
import reactGA from "react-ga4";

reactGA.initialize("G-R0371QD07B");
export default function Signin(props) {
  const [users, setUsers] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navi = useNavigate();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  //retrive users
  const retriveUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  };
  useEffect(() => {
    reactGA.pageview(window.location.pathname + window.location.search);
    const getAllUsers = async () => {
      const allUsers = await retriveUsers();
      if (allUsers) setUsers(allUsers);
      if (!userDetails.email && !userDetails.password) {
        // setSubmit(false);
        props.setAuth("");
      }
    };
    getAllUsers();
  }, []);
  ////////////////////////////////////////
  const validate = (Details) => {
    const { email, password } = Details;
    const err = {};
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!email) {
      err.email = "Email is required.";
    } else if (!regEx.test(email)) {
      err.email = "Please enter valid email.";
    } else if (!users.find((element) => element.email === email)) {
      err.email = "Email is wrong.";
    }
    if (!password) {
      err.password = "Password is required.";
    } else if (
      !users.find((element) => {
        if (element.email === email && element.password === password) {
          if (element.userType === "admin") {
            props.setAuth("admin");
          } else {
            props.setAuth("user");
          }

          props.isType(element.userType);
          return true;
        }

        return false;
      })
    ) {
      err.password = "wrong password";
    }
    return err;
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      props.showAlert("User Signed In Successfully.");
      navi("/success");
      setUserDetails({
        email: "",
        password: "",
      });
    }
  }, [errors]);
  const submitHandle = (e) => {
    e.preventDefault();
    setErrors(validate(userDetails));
    setSubmit(true);
  };
  return (
    <div className="container">
      <div className="row text-center">
        <form onSubmit={submitHandle} className="container text-center">
          <h1 className="text-center">Sign In</h1>
          <div className="mb-3 ">
            <label htmlFor="inp" className="form-label">
              Email
            </label>
            <div className="container col-sm-5">
              <input
                name="email"
                type="email"
                className="form-control"
                value={userDetails.email}
                aria-describedby="emailHelp"
                onChange={onChangeHandler}
              />
              <p className="text-danger">{errors.email}</p>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Pass" className="form-label">
              Password
            </label>
            <div className="container col-sm-5">
              <input
                name="password"
                type="password"
                className="form-control"
                value={userDetails.password}
                onChange={onChangeHandler}
              />
              <p className="text-danger">{errors.password}</p>
            </div>
          </div>

          <Link
            onClick={submitHandle}
            type="submit"
            to="/success"
            className="btn btn-primary"
          >
            Sign in
          </Link>
        </form>
        <Link type="submit" to="/signup">
          If You are New User Then Sign Up
        </Link>
      </div>
    </div>
  );
}
