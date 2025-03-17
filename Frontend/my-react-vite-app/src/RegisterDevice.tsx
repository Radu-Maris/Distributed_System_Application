import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterDevice = (): JSX.Element => {

  const [deviceName, setDeviceName] = useState("");
  const [deviceAddress, setDeviceAddress] = useState("");
  const [deviceDescription, setDeviceDescription] = useState("");
  const [deviceMaxConsumption, setDeviceMaxConsumption] = useState("");
  const [deviceUserId, setDeviceUserId] = useState("");
  const [errorMessage, ] = useState<String>("Fields cannot be empty");


  const deviceNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDeviceName(event.target.value);
  };

  const deviceAddressHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDeviceAddress(event.target.value);
  };

  const deviceDescriptionHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDeviceDescription(event.target.value);
  };

  const deviceMaxConsumptionHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDeviceMaxConsumption(event.target.value);
  };

  const deviceUserIdHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDeviceUserId(event.target.value);
  };

  const createDevice = async (_event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if(deviceName === "" || deviceAddress === "" || deviceDescription === "" || deviceMaxConsumption === "" || deviceUserId === ""){
        throw errorMessage;
      }
      await axios.post("http://devices.localhost:88/device/insertDevice", {
        deviceName: deviceName,
        deviceAddress: deviceAddress,
        deviceDescription: deviceDescription,
        deviceMaxConsumption: deviceMaxConsumption,
        userId: deviceUserId,
      });
      alert("Device registered succesfuly");
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
            <label htmlFor="DeviceName" className="form-label">
              Device Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Device Name"
              name="deviceName"
              value={deviceName}
              onChange={deviceNameHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="DeviceAddress" className="form-label">
              Device Address
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Device Address"
              name="deviceAddress"
              value={deviceAddress}
              onChange={deviceAddressHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="DeviceDescription" className="form-label">
              Device Description
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Device Description"
              name="deviceDescription"
              value={deviceDescription}
              onChange={deviceDescriptionHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="DeviceMaxConsumption" className="form-label">
              Device Max Consumption
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Device Max Consumption"
              name="deviceMaxConsumption"
              value={deviceMaxConsumption}
              onChange={deviceMaxConsumptionHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="DeviceUserId" className="form-label">
              Device User Id
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter your Device User Id"
              name="deviceUserId"
              value={deviceUserId}
              onChange={deviceUserIdHandler}
            />
          </div>
          <button className="btn btn-outline-primary" onClick={createDevice}>
            Submit
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/Admin">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
