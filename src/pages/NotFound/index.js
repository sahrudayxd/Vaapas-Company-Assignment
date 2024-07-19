import { useNavigate } from "react-router-dom";
import "./index.css";

const NotFound = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={redirectToHome} className="home-button">
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
