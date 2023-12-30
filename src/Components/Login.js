import { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";

export const Login = ({ token, setToken, fetchUser }) => {
  const CLIENT_ID = "9648b40e05f14d25af650f5522abb61e";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <div className="login">
      <img
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="Spotify logo"
      />
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        LOGIN WITH SPOTIFY
      </a>
    </div>
  );
};

// export default Login;
