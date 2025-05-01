import React from "react";
import api from "../../api";

const CreateAccount = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    api
      .post("/user", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 201) {
          window.location.href = "/login";
        }
        if (res.status === 409) {
          setError("Email already in use");
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setError("Email in use");
        } else {
          setError(error.response.data);
        }
      });
  };
  return (
    <div className="container">
      <h2 className="my-4">Create an Account:</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row mx-0 gap-md-4">
          <input
            className="form-control col-md col-sm-12 mt-2"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="form-control col-md col-sm-12 mt-2"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          className="form-control col mt-2"
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control col mt-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="row gap-md-4 mx-0">
          <button className="btn btn-success mt-2 col-md order-md-1 order-2 col-sm-12">
            Create Account
          </button>
          <button
            className="btn btn-warning mt-2 col-md order-md-2 order-1 col-sm-12"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/login";
            }}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
