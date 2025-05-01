import React from "react";
import { useState } from "react";
import User_Logo from "./User_Logo.png";
import Pass_Logo from "./Password_Logo.webp";
import { useAuth } from "../../Contexts/AuthContext";

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loginError } = useAuth();
  //this then redirects if the status code is 200, but this is a development thing. It should instead get the authentication token, store that locally, and then redirect to homepage

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="h3 text-dark text-center mb-4 mt-5 px-0 fs-2 fw-bold">
            Login:
          </h1>
        </div>
        {loginError ? (
          <div className="alert alert-danger mx-0" role="alert">
            {loginError}
          </div>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(email, password);
          }}
        >
          <div className="row d-flex justify-content-center align-items-center">
            <img
              src={User_Logo}
              alt="User Logo"
              className="mr-3"
              style={{
                width: "50px",
                height: "25px",
                marginRight: "7px",
                marginLeft: "8px",
              }}
            />
            <input
              className="form-control mb-3 mt-3"
              type="text"
              placeholder="Enter your email address"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flexGrow: 1, maxWidth: "calc(100% - 65px)" }}
            />
          </div>
          <div className="row d-flex justify-content-center align-items-center">
            <img
              src={Pass_Logo}
              alt="Password Logo"
              className="mr-3"
              style={{ width: "65px", height: "40px", marginBottom: "30px" }}
            />
            <input
              className="form-control mb-5 mt-3"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ flexGrow: 1, maxWidth: "calc(100% - 65px)" }}
            />
          </div>
          <div className="row d-flex justify-content-center">
            <button
              className="btn btn-success col-md-12 col-sm-12 mb-3 mt-5 fs-5"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="row d-flex justify-content-center">
            <button
              className="btn btn-warning col-md-12 col-sm-12 mb-3 mt-2 fs-6"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/create-account";
              }}
            >
              Don't have an account?
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginBox;
