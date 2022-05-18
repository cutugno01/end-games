//*| Hooks and Libraries
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

//*| Components
import ModalOne from "../../components/modals/ModalOne";
import CheckIcon from "../../assets/icons/check.svg";

const ForgotPassword = () => {
  // useEffect(() => {
  //   if (auth !== 0) {
  //     navigate("/");
  //   }
  // }, []);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(false);
  interface IState {
    step: number;
    email: string;
    token: string;
    password: string;
    confirmPassword: string;
  }

  const [state, setState] = useState<IState>({
    step: 0,
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  });

  const nextStep = () => {
    setState((state) => ({
      ...state,
      step: 1,
    }));
  };

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

  const handleRequestToken = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: make request to server

    //Upon request success
    nextStep();
  };

  const handleRequestReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: make request to server
    //Upon request success
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="auth-container">
      {(() => {
        switch (state.step) {
          case 0:
            return (
              <form
                className="auth"
                onSubmit={(e) => {
                  handleRequestToken(e);
                }}
              >
                <h2 className="auth-title">Reset password</h2>
                <div className="auth-link-container">
                  <h3 className="auth-link" onClick={() => navigate("/signin")}>
                    <svg
                      className="auth-link-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                    </svg>
                    Go back
                  </h3>
                </div>
                <div className="auth-input-wrapper">
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
                  <button className="auth-submit-button">REQUEST RESET</button>
                </div>
              </form>
            );
          case 1:
            return (
              <form
                className="auth"
                onSubmit={(e) => {
                  handleRequestReset(e);
                }}
              >
                <svg
                  className="auth-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <h3 className="auth-paragraph">
                  We have sent an email to <i>{state.email}</i>
                </h3>
                <div className="auth-link-container">
                  <h3 className="auth-link" onClick={() => navigate("/signin")}>
                    Go back
                  </h3>
                </div>
                <div className="auth-input-wrapper">
                  <h2 className="auth-input-name">Token</h2>
                  <div
                    className={`auth-input-container ${
                      state.token !== "" ? "active" : ""
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
                        d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      className="auth-input"
                      type="text"
                      required
                      value={state.token}
                      onChange={(e) => {
                        handleSetStateValue("token", e.target.value);
                      }}
                    />
                  </div>
                  <h2 className="auth-input-name">New password</h2>
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
                  <button className="auth-submit-button">RESET</button>
                </div>
                <AnimatePresence>
                  {isModalOpen && (
                    <ModalOne
                      handleCloseModal={handleCloseModal}
                      icon={CheckIcon}
                      paragraph="You can now login with your new password"
                      title="Password has been reset"
                      navigateLink={{ name: "Signin", link: "signin" }}
                    />
                  )}
                </AnimatePresence>
              </form>
            );
          default:
            <>aa</>;
        }
      })()}
    </div>
  );
};

export default ForgotPassword;
