import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth">
        <h2 className="auth-title">Not found</h2>
        <div className="auth-link-container">
          <h3 className="auth-link" onClick={() => navigate("/")}>
            <svg
              className="auth-link-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
