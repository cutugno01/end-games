import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth">
        <h2 className="auth-title">Product not found</h2>
        <div className="auth-link-container">
          <h3 className="auth-link" onClick={() => navigate("/")}>
            Home
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
