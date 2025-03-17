if (typeof global === 'undefined') {
  (window as any).global = window;
}

import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import { Login } from "./Login";
import { Admin } from "./Admin";
import { Register } from "./Register";
import { UserView } from "./UserView";
import { AdminViewUsers } from "./AdminViewUsers";
import { ViewDevicesOfUser } from "./ViewDevicesOfUser";
import { ViewAllDevices } from "./ViewAllDevices";
import { EditUsers } from "./EditUsers";
import { EditDevices } from "./EditDevices";
import MeasurementGraph from "./MeasurmentGraph" 
import Chat from "./ChatApp";

import ProtectedRoute from "./ProtectedRoute";
import { RegisterDevice } from "./RegisterDevice";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Admin"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserView"
          element={
            <ProtectedRoute roles={["user"]}>
              <UserView />
            </ProtectedRoute>
          }
        />
        <Route path="/Admin/ViewAllUsers" element={<AdminViewUsers />} />
        <Route
          path="/Admin/ViewAllUsers"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <AdminViewUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ViewDevicesOfUser/:id"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <ViewDevicesOfUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/ViewAllDevices"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <ViewAllDevices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditUsers/:id"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <EditUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditDevices/:id"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <EditDevices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/RegisterDevice"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <RegisterDevice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MeasurementGraph/:deviceId"
          element={
              <MeasurementGraphWrapper />
          }
        />
        <Route
          path="/Chat"
          element={
              <Chat />
          }
        />
      </Routes>
    </Router>
  );
};

const MeasurementGraphWrapper: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  if (!deviceId) {
    return <p>Device ID is required.</p>;
  }

  return <MeasurementGraph deviceId={parseInt(deviceId, 10)} />;
};

export default App;
