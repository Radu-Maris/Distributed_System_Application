import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Device } from "./Device";


export const ViewDevicesOfUser = (): JSX.Element => {
  const [devices, setDevices] = useState<Device[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
        const authToken = localStorage.getItem("authToken");
  
        const result = await axios.get(`http://devices.localhost:88/device/getDevicesOfUser/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setDevices(result.data);
      } catch (error) {
        console.error("Failed to load devices:", error);
      }
  }

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
                        </tr>
                        ))}
                    </tbody>
                </table>
                <Link className="btn btn-outline-danger" to="/Admin/ViewAllUsers">
                Back
                </Link>
            </div>
        </div>
    );
};
