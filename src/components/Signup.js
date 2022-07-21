import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import api from "../api/users";
function Signup(props) {
  const [users, setUsers] = useState(null);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confPassword: "",
    userType: "",
  });
  /////ONCHANGE EVENT HANDLER
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
    if (value === "guest") {
      props.isType("");
    }
  };

  ////////////////////////////////
  const [isSubmit, setSubmit] = useState(false);
  const [Errors, setErrors] = useState({});
  const validate = (Details) => {
    const { email, confPassword, password, userType } = Details;
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const err = {};

    if (userType === "select" || userType.length === 0) {
      err.userType = "Please select user type.";
    }
    if (!email) {
      err.email = "Email is Required";
    } else if (!regEx.test(email)) {
      err.email = "Please enter valid email.";
    } else if (users.find((element) => element.email === email)) {
      err.email = "Email in Use";
    }
    if (!password) {
      err.password = "Password is Required";
    } else if (password.length <= 4) {
      err.password = "Password must be greater than 4 characters.";
    }
    if (!confPassword) {
      err.confPassword = "Confirmation password is required.";
    } else if (!(confPassword === password)) {
      err.confPassword = "Password does not match.";
    }
    return err;
  };
  ////////////////////////////////
  const saveUser = async (e) => {
    e.preventDefault();

    setErrors(validate(userDetails));
  };
  //////////////////////////////////
  const saveUserInJson = async () => {
    const { email, password, userType } = userDetails;

    if (email.length !== 0 && password.length !== 0) {
      const request = {
        id: new Date().getTime().toString(),
        email,
        password,
        userType,
      };
      const res = await api.post("/users", request);
      users.push(res.data);
      await props.showAlert("User Signed Up Successfully.");
      setSubmit(true);
    }
  };

  useEffect(() => {
    // console.log(Errors);
    // setSubmit(true);
    if (Object.keys(Errors).length === 0 && !isSubmit) {
      saveUserInJson();
      setUserDetails({
        email: "",
        password: "",
        confPassword: "",
        userType: "",
      });
    }
  }, [Errors]);
  /////////////////////////////////////
  //retrive users
  const retriveUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  };
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retriveUsers();
      if (allUsers) setUsers(allUsers);
    };
    getAllUsers();
  }, []);
  ////////////////////////////////////////
  return (
    <div className="container ">
      <h1 style={{ marginBottom: "40px" }} className="text-center">
        Sign Up
      </h1>

      <form
        onClick={saveUser}
        action="/signin"
        method="POST"
        className="container "
      >
        <div className="mb-3">
          <div className="container col-sm-3">
            <select
              className="form-select"
              onClick={onChangeHandler}
              name="userType"
            >
              <option
                name="userType"
                onClick={onChangeHandler}
                value="select"
                className="dropdown-item"
              >
                Select
              </option>
              <option
                name="userType"
                onClick={onChangeHandler}
                value="admin"
                className="dropdown-item"
              >
                Admin
              </option>
              <option
                name="userType"
                onClick={onChangeHandler}
                value="user"
                className="dropdown-item"
              >
                User
              </option>

              <option
                name="userType"
                onClick={onChangeHandler}
                value="guest"
                className="dropdown-item"
              >
                {userDetails.userType === "guest" && (
                  <Navigate to="/success" replace></Navigate>
                )}
                Guest
              </option>
            </select>
            <p className="text-danger">{Errors.userType}</p>
          </div>
        </div>
        <div className="mb-3">
          <div className="container col-sm-5">
            <label htmlFor="inp" className="form-label">
              Enter your email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="inp"
              value={userDetails.email}
              onChange={onChangeHandler}
            />
            <p className="text-danger">{Errors.email}</p>
          </div>
        </div>
        <div className="mb-3">
          <div className="container col-sm-5">
            <label htmlFor="Pass" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="Pass"
              value={userDetails.password}
              onChange={onChangeHandler}
            />
            <p className="text-danger">{Errors.password}</p>
          </div>
        </div>
        <div className="mb-3">
          <div className="container col-sm-5">
            <label htmlFor="confPass" className="form-label">
              Confirm Password
            </label>
            <input
              className="form-control"
              name="confPassword"
              type="password"
              id="confPass"
              value={userDetails.confPassword}
              onChange={onChangeHandler}
            />
            <p className="text-danger">{Errors.confPassword}</p>
          </div>
        </div>
        <div className="mb-3 text-center">
          <div className="container col-sm-5">
            <Link
              type="submit"
              className="btn btn-primary"
              to="/"
              onClick={saveUser}
            >
              {isSubmit && <Navigate to="/" replace></Navigate>}
              Signup
            </Link>

            <div className="mb-3">
              {" "}
              <Link to="/">If You have already account then Sign in</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
