import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Register = (): JSX.Element => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage] = useState<String>("Fields cannot be empty");
  const [role] = useState("user");

  const usernameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.target.value);
  };

  const passwordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  const firstNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLastName(event.target.value);
  };


  const createAccount = async (_event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if(username === "" || password === "" || firstName === "" || lastName === ""){
        throw errorMessage;
      }
      await axios.post("http://user.localhost:81/users/add", {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role,
      });
      alert("Accout registered succesfuly");
    } catch (error) {
      alert("Cannot Insert");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Player</h2>

          <div className="mb-3">
            <label htmlFor="UserName" className="form-label">
              Username
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Username"
              name="name"
              value={username}
              onChange={usernameHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Password"
              name="password"
              value={password}
              onChange={passwordHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="First Name" className="form-label">
              First Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Firstname"
              name="firstname"
              value={firstName}
              onChange={firstNameHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Last Name" className="form-label">
              Last Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Lastname"
              name="lastname"
              value={lastName}
              onChange={lastNameHandler}
            />
          </div>
          <button className="btn btn-outline-primary" onClick={createAccount}>
            Submit
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/Login">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
