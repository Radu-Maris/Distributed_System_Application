import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "./User";
import { Device } from "./Device";

export const AdminViewUsers = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    loadUsers();
    loadDevices();
  }, []);

  const getAuthToken = (): string | null => {
    return localStorage.getItem("authToken");
  };

  const axiosWithAuth = axios.create();

  axiosWithAuth.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const loadUsers = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const result = await axios.get("http://user.localhost:81/users/getAll", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUsers(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
      alert("Unauthorized access. Please log in.");
    }
  };

  const loadDevices = async () => {
    const result = await axios.get("http://devices.localhost:88/device/getAll");
    setDevices(result.data);
  };

  const deleteDevicesOfUser = async (userId: number) => {
    try {
      console.log("id user:", userId);
      const response = await axios.delete(`http://devices.localhost:88/device/deleteAllDevicesOfUser/${userId}`);
      console.log("Device deletion response:", response);
      alert("Devices deleted auccesfully");
    } catch (error) {
      console.error("error: ", error);
      alert("Cannot delete some device");
    }
  };

  const deleteAccount = async (userId: number) => {
    try {

      loadDevices();
      await deleteDevicesOfUser(userId);

      await axios.delete(`http://user.localhost:81/users/delete?id=${userId}`);
      alert("Account deleted successfully");
      loadUsers();
    } catch (error) {
      alert("Cannot delete the account");
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Role</th>
              <th scope="col">Asociated Devices</th>
              <th scope="col">Modify</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/ViewDevicesOfUser/${user.userId}`}
                  >
                    View Devices
                  </Link>
                </td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/EditUsers/${user.userId}`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteAccount(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link className="btn btn-outline-danger" to="/Admin">
          Back
        </Link>
      </div>
    </div>
  );
};
