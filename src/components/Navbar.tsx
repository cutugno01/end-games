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
      <div className="nav-links-container relative">
        <div className="nav-links-container-decorations">
          <svg
            className="nav-links-container-decoration right"
            height="100%"
            viewBox="0 0 108 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 64C62.8598 50.6661 83.9927 3.31554 104.868 1H108C106.953 0.881039 105.911 0.884327 104.868 1L0 1L0 64Z"
              fill="#EC2C45"
            />
          </svg>
          <svg
            className="nav-links-container-decoration left"
            height="100%"
            viewBox="0 0 108 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.62939e-06 0C18.2022 7.26923 43.6854 63 108 63L108 0L7.62939e-06 0Z"
              fill="#EC2C45"
            />
          </svg>
        </div>
        <div className="nav-links">
          <div
            className={`nav-link relative ${path[1] === "" ? "active" : ""}`}
            onClick={() => navigate(`/`)}
          >
            <svg
              width="100%"
              className={`nav-link-decoration ${
                path[1] === "" ? "active" : ""
              }`}
              viewBox="0 0 24 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 0C24 1.57586 23.6896 3.13629 23.0866 4.5922C22.4835 6.04811 21.5996 7.37098 20.4853 8.48528C19.371 9.59958 18.0481 10.4835 16.5922 11.0866C15.1363 11.6896 13.5759 12 12 12C10.4241 12 8.86371 11.6896 7.4078 11.0866C5.95189 10.4835 4.62902 9.59958 3.51472 8.48528C2.40042 7.37098 1.5165 6.04811 0.913445 4.5922C0.310389 3.13629 -1.37766e-07 1.57586 0 -1.04907e-06L12 0H24Z"
                fill="currentColor"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="nav-link-icon"
              fill="currentColor"
            >
              <path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z" />
            </svg>
            {/* <h2 className="nav-link-name">Games</h2> */}
          </div>
          <div
            className={`nav-link relative ${
              path[1] === "search" ? "active" : ""
            }`}
            onClick={() => navigate("/search")}
          >
            <svg
              width="100%"
              className={`nav-link-decoration ${
                path[1] === "" ? "active" : ""
              }`}
              viewBox="0 0 24 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 0C24 1.57586 23.6896 3.13629 23.0866 4.5922C22.4835 6.04811 21.5996 7.37098 20.4853 8.48528C19.371 9.59958 18.0481 10.4835 16.5922 11.0866C15.1363 11.6896 13.5759 12 12 12C10.4241 12 8.86371 11.6896 7.4078 11.0866C5.95189 10.4835 4.62902 9.59958 3.51472 8.48528C2.40042 7.37098 1.5165 6.04811 0.913445 4.5922C0.310389 3.13629 -1.37766e-07 1.57586 0 -1.04907e-06L12 0H24Z"
                fill="currentColor"
              />
            </svg>
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
            {/* <h2 className="nav-link-name">Search</h2> */}
          </div>
        </div>
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
              className="nav-link-account-icon"
              fill="currentColor"
            >
              <path d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z" />
            </svg>
          </h3>
        )}
      </div>
    </div>
  );
};

export default Navbar;
