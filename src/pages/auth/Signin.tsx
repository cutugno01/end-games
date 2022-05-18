//*| Hooks and Libraries
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";

//*| Components
import Logo from "../../assets/logo.svg";

const Signin = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showError, setShowError] = useState(false);

  interface IState {
    email_usr: string;
    password: string;
  }

  const [state, setState] = useState<IState>({
    email_usr: "",
    password: "",
  });

  const handleSetStateValue = (name: string, value: string) => {
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleLoginRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/user/login", {
        email_usr: state.email_usr,
        password: state.password,
      })
      .then((res) => {
        //console.log(res.data.data.auth_token);
        const auth_token = res.data.data.auth_token;
        window.localStorage.setItem("auth_token", auth_token);
        window.location.reload();
      })
      .catch(() => {
        setShowError(true);
      });
  };

  return (
    <div className="auth-container">
      <form className="auth login" onSubmit={(e) => handleLoginRequest(e)}>
        <img className="auth-logo" src={Logo} alt="" />
        <div className="auth-link-container">
          <h3>Don't have an account?</h3>
          <h3 className="auth-link" onClick={() => navigate("/signup")}>
            Signup
          </h3>
        </div>
        <div className="auth-input-wrapper">
          {showError && (
            <div className="auth-error">
              <svg
                className="auth-input-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="auth-error-message">
                An error occurred. Check your credentials.
              </h3>
            </div>
          )}
          <h2 className="auth-input-name">
            Username<u className="auth-input-separator">/</u>Email
          </h2>
          <div
            className={`auth-input-container ${
              state.email_usr !== "" ? "active" : ""
            }`}
          >
            {state.email_usr.includes("@") ? (
              <svg
                className="auth-input-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            ) : (
              <svg
                className="auth-input-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <input
              className="auth-input"
              type="text"
              required
              value={state.email_usr}
              onChange={(e) => {
                handleSetStateValue("email_usr", e.target.value);
              }}
            />
          </div>
          <h2 className="auth-input-name">Password</h2>
          <div
            className={`auth-input-container ${
              state.password !== "" ? "active" : ""
            }`}
          >
            <svg
              className="auth-input-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="auth-input"
              type={`${isPasswordVisible ? "text" : "password"}`}
              required
              value={state.password}
              onChange={(e) => {
                handleSetStateValue("password", e.target.value);
              }}
            />
            {isPasswordVisible ? (
              <svg
                className="auth-input-icon pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setIsPasswordVisible(false);
                }}
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="auth-input-icon pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setIsPasswordVisible(true);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </div>
          <button className="auth-submit-button">SIGN-IN</button>
          <p
            className="login-forgot"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
