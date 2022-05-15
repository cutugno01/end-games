import { useNavigate } from "react-router-dom";

const Profile = ({
  user,
}: {
  user: { username: string; email: string; role: number };
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("auth_token");
    window.location.reload();
  };
  return (
    <div className="auth-container">
      <div className="auth profile">
        <h2 className="auth-title">Account Informations</h2>
        <div className="auth-link-container">
          <h3 className="auth-link" onClick={() => navigate("/")}>
            Go back
          </h3>
        </div>
        <div className="auth-input-wrapper">
          <h2 className="auth-input-name">Email</h2>
          <div className={`auth-input-container active`}>
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
              readOnly
              className="auth-input"
              type="email"
              required
              value={user.email}
            />
          </div>
          <h2 className="auth-input-name">Username</h2>
          <div className={`auth-input-container active`}>
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
              readOnly
              className="auth-input"
              type="text"
              required
              value={user.username}
            />
          </div>
        </div>
        <div
          className="flex-center-row profile-logout-container"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="profile-logout-icon"
            fill="currentColor"
          >
            <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
          </svg>
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
