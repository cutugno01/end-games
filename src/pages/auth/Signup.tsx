//*| Hooks and Libraries
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

//*| Components
import ModalOne from "../../components/modals/ModalOne";
import CheckIcon from "../../assets/icons/check.svg";
import LoadingOverlay from "../../components/LoadingOverlay";

const Signup = () => {
  // Regex
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  //const minLengthRegExp = /.{8,}/;

  const navigate = useNavigate();
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  interface IState {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  const [state, setState] = useState<IState>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSetStateValue = (name: string, value: string) => {
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    state.confirmPassword === state.password
      ? setDoesPasswordMatch(true)
      : setDoesPasswordMatch(false);
    state.password === "" && setDoesPasswordMatch(false);
  }, [state.confirmPassword, state.password]);

  const handleSignupRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      state.username.length < 3 ||
      state.password.length < 8 ||
      !uppercaseRegExp.test(state.password) ||
      !lowercaseRegExp.test(state.password) ||
      !digitsRegExp.test(state.password) ||
      !specialCharRegExp.test(state.password) ||
      !doesPasswordMatch
    ) {
      return;
    }
    await axios
      .post("https://api.end-games.nexthub.io/user/signup", {
        email: state.email,
        username: state.username,
        password: state.password,
      })
      .then(() => {
        setIsModalOpen(true);
      })
      .catch(() => {
        setShowError(true);
      });
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      {isLoading && <LoadingOverlay />}
      <form className="auth signup" onSubmit={(e) => handleSignupRequest(e)}>
        <h2 className="auth-title">Register a new account</h2>
        <div className="auth-link-container">
          <h3>Already have an account?</h3>
          <h3 className="auth-link" onClick={() => navigate("/signin")}>
            Sign-in
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
                An error occurred. Try again.
              </h3>
            </div>
          )}
          <h2 className="auth-input-name">Email</h2>
          <div
            className={`auth-input-container ${
              state.email !== "" ? "active" : ""
            }`}
          >
            <svg
              className="auth-input-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <input
              className="auth-input"
              type="email"
              required
              value={state.email}
              onChange={(e) => {
                handleSetStateValue("email", e.target.value);
              }}
            />
          </div>
          <h2 className="auth-input-name">Username</h2>
          <div
            className={`auth-input-container ${
              state.username !== "" ? "active" : ""
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
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="auth-input"
              type="text"
              required
              value={state.username}
              onChange={(e) => {
                handleSetStateValue("username", e.target.value);
              }}
            />
          </div>
          <div className="signup-regex-container">
            <p
              className={`signup-regex ${
                state.username.length >= 3 ? "active" : ""
              }`}
            >
              3 characters
            </p>
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
          <div className="signup-regex-container">
            <p
              className={`signup-regex ${
                state.password.length >= 8 ? "active" : ""
              }`}
            >
              8 characters
            </p>
            <p
              className={`signup-regex ${
                uppercaseRegExp.test(state.password) ? "active" : ""
              }`}
            >
              Uppercase letter
            </p>
            <p
              className={`signup-regex ${
                lowercaseRegExp.test(state.password) ? "active" : ""
              }`}
            >
              Lowercase letter
            </p>
            <p
              className={`signup-regex ${
                digitsRegExp.test(state.password) ? "active" : ""
              }`}
            >
              Number
            </p>
            <p
              className={`signup-regex ${
                specialCharRegExp.test(state.password) ? "active" : ""
              }`}
            >
              Special character
            </p>
          </div>
          <h2 className="auth-input-name">Confirm password</h2>
          <div
            className={`auth-input-container ${
              state.confirmPassword !== "" ? "active" : ""
            }`}
          >
            {doesPasswordMatch ? (
              <svg
                className="auth-input-icon"
                fill="#F6F6F6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
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
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <input
              className="auth-input"
              type="password"
              required
              value={state.confirmPassword}
              onChange={(e) => {
                handleSetStateValue("confirmPassword", e.target.value);
              }}
            />
          </div>
          <button className="auth-submit-button">SIGNUP</button>
        </div>
        <AnimatePresence>
          {isModalOpen && (
            <ModalOne
              handleCloseModal={handleCloseModal}
              icon={CheckIcon}
              title="Signup complete!"
              paragraph="You can now"
              navigateLink={{ name: "Login", link: "signin" }}
            />
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default Signup;
