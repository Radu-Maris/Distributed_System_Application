import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Device } from "./Device";


export const ViewAllDevices = (): JSX.Element => {
  const [devices2, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
        const authToken = localStorage.getItem("authToken");
  
        const result2 = await axios.get("http://devices.localhost:88/device/getAll", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setDevices(result2.data);
      } catch (error) {
        console.error("Failed to load devices:", error);
      }
  }

  const deleteDevice = async (deviceId: number) => {
    try {
        const authToken = localStorage.getItem("authToken");
  
        await axios.delete(`http://devices.localhost:88/device/deleteDevice/${deviceId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        alert("Device deleted successfully");
        loadDevices();
      } catch (error) {
        alert("Cannot delete the device");
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
                            <th scope="col">Modify</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices2.map((device2) => (
                        <tr key={device2.deviceId}>
                            <td>{device2.deviceId}</td>
                            <td>{device2.deviceName}</td>
                            <td>{device2.deviceAddress}</td>
                            <td>{device2.deviceDescription}</td>
                            <td>{device2.deviceMaxConsumption}</td>
                            <td>
                                <Link
                                    className="btn btn-outline-primary mx-2"
                                    to={`/EditDevices/${device2.deviceId}`}
                                >
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => deleteDevice(device2.deviceId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        ))
                        }
                    </tbody>
                </table>
                <Link className="btn btn-outline-danger" to="/Admin">
                Back
                </Link>
            </div>
        </div>
    );
};
