//*| Hooks and Libraries
import { useNavigate, useLocation } from "react-router";
//import { useState } from "react";

//*| Components
import Logo from "../assets/logo.svg";

const Navbar = ({
  user,
}: {
  user: { username: string; email: string; role: number };
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/");

  return (
    <div className="nav">
      <div className="nav-logo-container">
        <img className="nav-logo" src={Logo} alt="logo" />
      </div>
      <div className="nav-links">
        <h2
          className={`nav-link ${path[1] === "" ? "active" : ""}`}
          onClick={() => navigate(`/`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="nav-link-icon"
            fill="currentColor"
          >
            <path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z" />
          </svg>
        </h2>
        <h2
          className={`nav-link ${path[1] === "search" ? "active" : ""}`}
          onClick={() => navigate("/search")}
        >
          <svg
            className="nav-link-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </h2>
        {/* <h2
          className={`nav-link ${path[1] === "contact" ? "active" : ""}`}
          onClick={() => navigate(`/contact`)}
        >
          <svg
            className="nav-link-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </h2> */}
        {/* <div
          className={`flex-center nav-search-icon-container ${
            path[1] === "search" ? "active" : ""
          }`}
          onClick={() => navigate("/search")}
        >
          <svg
            className="nav-search-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div> */}
      </div>
      <div className="nav-account-container">
        {user.role === -1 ? (
          <h3 className="nav-account-link" onClick={() => navigate("/signin")}>
            Sign-in
          </h3>
        ) : (
          <h3 className="nav-account-link" onClick={() => navigate("/profile")}>
            {user.username}
          </h3>
        )}
        {user.role === 1 && (
          <h3
            className="nav-account-link"
            onClick={() => navigate("/admin-upload-product")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="nav-link-icon"
              fill="currentColor"
            >
              <path d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z" />
            </svg>
          </h3>
        )}
        {/* {(() => {
          switch (user.role) {
            case -1:
              return (
                <h3
                  className="nav-account-link"
                  onClick={() => navigate("/signin")}
                >
                  Sign-in
                </h3>
              );
            case 0:
              return <h3 className="nav-account-link">Account</h3>;
            case 1:
              return (
                <h3
                  className="nav-account-link"
                  onClick={() => navigate("/admin-upload-product")}
                >
                  Admin
                </h3>
              );
            default:
              break;
          }
        })()} */}
      </div>
    </div>
  );
};

export default Navbar;
