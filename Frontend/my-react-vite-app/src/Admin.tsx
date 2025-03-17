import { Link } from "react-router-dom";

export const Admin = (): JSX.Element => {
  
  const usernameUsed = localStorage.getItem("usernameUsed");
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Admin Main Page</h2>
            <Link className="btn btn-outline-danger mx-2" to="/Login">
              Back
            </Link>
            <Link className="btn btn-outline-danger mx-2" to="/Admin/ViewAllUsers">
              View All Users
            </Link>
            <Link className="btn btn-outline-danger mx-2" to="/Admin/ViewAllDevices">
              View All Devices
            </Link>
            <Link className="btn btn-outline-danger mx-2" to="/Admin/RegisterDevice">
              Create New Device
            </Link>
            <Link
              className="btn btn-outline-primary mx-2" to={`/Chat?sender=${usernameUsed}`}>
              Chat
            </Link>
        </div>
      </div>
    </div>
  );
}
