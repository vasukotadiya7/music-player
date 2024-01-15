import { Link } from "react-router-dom";
import styles from "./index.css";

function Signup() {
  const googleAuth = () => {
    window.open(
      // `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      // `http://localhost:8080/auth/google/callback`,
      `http://tuneify.cyclic.app/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div className="signuppage">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/232px-Spotify_icon.svg.png"
        alt="logo"
      />

      <button onClick={googleAuth} style={{ height: "50px" }}>
        <span>Sign up with Google</span>
      </button>
      {/* <p>
        Already Have Account ? <Link to="/login">Log In</Link>
      </p> */}
    </div>
  );
}

export default Signup;
