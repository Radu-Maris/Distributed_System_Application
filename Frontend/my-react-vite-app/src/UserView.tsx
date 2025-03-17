import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Device } from "./Device";

export const UserView = (): JSX.Element => {
  const [devices, setDevices] = useState<Device[]>([]);

  const userId = localStorage.getItem("userId");
  const usernameUsed = localStorage.getItem("usernameUsed");

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      const result = await axios.get(
        `http://devices.localhost:88/device/getDevicesOfUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setDevices(result.data);
    } catch (error) {
      console.error("Failed to load devices:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Device Name</th>
              <th scope="col">Address</th>
              <th scope="col">Description</th>
              <th scope="col">Max Consumption</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.deviceId}>
                <td>{device.deviceId}</td>
                <td>{device.deviceName}</td>
                <td>{device.deviceAddress}</td>
                <td>{device.deviceDescription}</td>
                <td>{device.deviceMaxConsumption}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary"
                    to={`/MeasurementGraph/${device.deviceId}`}
                  >
                    View Graph
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <Link
            className="btn btn-outline-primary mx-2" to={`/Chat?sender=${usernameUsed}`}>
            Chat
          </Link>
          <Link className="btn btn-outline-danger" to="/Login">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
