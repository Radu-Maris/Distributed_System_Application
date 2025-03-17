import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage] = useState<String>("Already exists");

  useEffect(() => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.setItem("userRole", "");
    localStorage.removeItem("authToken");
  }, []);

  const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  }

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  }

  const loginAccount = async (_event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (username === "" || password === "") {
        throw errorMessage;
      }
      const user = await axios.get(`http://user.localhost:81/users/login?username=${username}&password=${password}`);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authToken", user.data.token);
      localStorage.setItem("userRole", user.data.role);
      localStorage.setItem("userId", user.data.userId);
      localStorage.setItem("usernameUsed", user.data.username);
      console.log(user.data.token);
      if (user.data.role === "Admin") {
        navigate("/Admin");
      } else if (user.data.role === "user") {
        navigate("/UserView", { state: { userId: user.data.userId } });
      }
    } catch (error) {
      alert("Cannot Login");
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow">
          <h2 className="text-center m-4">Login</h2>

          <div className="mb-3">
            <label htmlFor="UserName" className="form-label">
              Username
            </label>
            <input
              type="text"
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
              type="password"
              className="form-control"
              placeholder="Enter your Password"
              name="password"
              value={password}
              onChange={passwordHandler}
            />
          </div>
          <button className="btn btn-outline-primary" onClick={loginAccount}>
            Login
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/Register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;


