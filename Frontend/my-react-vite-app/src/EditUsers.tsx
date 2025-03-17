import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export const EditUsers = (): JSX.Element => {

  const { id } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [, setUser] = useState();
  
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

  const firstnameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFirstname(event.target.value);
  };

  const lastnameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLastname(event.target.value);
  };

  const roleHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
): void => {
    setRole(event.target.value);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const result = await axios.get(`http://user.localhost:81/users/getById/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(result.data);
      setUsername(result.data.username);
      setPassword(result.data.password);
      setFirstname(result.data.firstName);
      setLastname(result.data.lastName);
      setRole(result.data.role);
    } catch (error) {
      console.error("Error loading user:", error);
      alert("Unauthorized access or user not found.");
    }
  };

  const updateAccount = async (_event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.put(
        "http://user.localhost:81/users/update",
        {
          userId: id,
          username: username,
          password: password,
          firstName: firstname,
          lastName: last_name,
          role: role,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert("Account edited successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Cannot edit the account.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit user</h2>

          <div className="mb-3">
            <label htmlFor="UserName" className="form-label">
              Username
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Username"
              name="username"
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
              value={firstname}
              onChange={firstnameHandler}
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
              name="last_name"
              value={last_name}
              onChange={lastnameHandler}
            />
          </div>
          <div>
            <select value={role} onChange={roleHandler}>
              <option value="user">
                user
              </option>
              <option value="Admin">
                Admin
              </option>
            </select>
          </div>
          <button className="btn btn-outline-primary" onClick={updateAccount}>
            Submit
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/Admin/ViewAllUsers">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
