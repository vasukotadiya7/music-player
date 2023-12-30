import React, { useState } from "react";
import { Login } from "./Login";
import { App } from "../App";
import axios from "axios";
import { useEffect } from "react";

function Auth() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // getToken()

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);
  const logout = (dispatch) => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const fetchUser = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        // q: searchKey,
        // type: "artist",
      },
    });

    return { id: data.id, name: data.display_name };
  };
  return (
    <>
      {!token ? (
        <Login token={token} setToken={setToken} />
      ) : (
        <App
          token={token}
          setToken={setToken}
          logout={logout}
          // fetchUser={fetchUser()}
        />
      )}
    </>
  );
}

export default Auth;
