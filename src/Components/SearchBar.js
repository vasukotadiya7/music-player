import { useEffect, useState } from "react";
import axios from "axios";
import "./SearchBar.css";
import { Navigate } from "react-router-dom";
export const SearchBar = ({
  playback,
  setPlayback,
  setIsPlaying,
  musicChanged,
  setMusicchanged,
  searchChange,
  user,
  setUser,
}) => {
  const getUser = async () => {
    try {
      // const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      // const url = `http://localhost:8080/auth/login/success`;
      const url = `http://tuneify.cyclic.app/auth/login/success`;
      // const { data } = await axios.get(url, { withCredentials: true });
      const { data } = await axios.get(url);
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const logout = () => {
    // window.open(`http://localhost:8080/auth/logout`, "_self");
    window.open(`http://tuneify.cyclic.app/auth/logout`, "_self");
  };
  console.log(user);
  const [searchtext, setSearchtext] = useState("");
  const [searchsug, setSearchsug] = useState([]);
  const [toggle, setToggle] = useState(false);
  const handleChange = async (e) => {
    const { value } = e.target;
    var se = document.getElementById("searchtext").value;
    setSearchtext(value);
    console.log(searchtext);
    const res = await fetch(
      "https://saavn.me/search/songs?query=" + se + "&page=1&limit=10",
      // "https://saavn.me/search/songs?query=kesariya&page=1&limit=2",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await res.json();
    if (result.status === "SUCCESS") {
      setSearchsug(result.data.results);
      console.log(searchsug);
    } else {
      // alert("No Song Found !");
      // setSearchtext("");
    }
  };

  return (
    <div className="mainSearchbar">
      <div className="searchbar">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/232px-Spotify_icon.svg.png"
          style={{ height: "50px" }}
          alt="logo"
          onClick={() => {
            window.location.reload();
          }}
        />
        <div className="searchabrandbutton">
          <select id="searchType">
            <option value="song">song</option>
            <option value="artist">artist</option>
            <option value="album">album</option>
            <option value="playlist">playlist</option>
          </select>
          <input
            autoSave="off"
            autoComplete="off"
            type="Text"
            id="searchtext"
            name="searchtext"
            value={searchtext}
            onChange={handleChange}
            placeholder="Type Something"
          />
        </div>
        <div className="userdetails">
          {/* {user === null ? <Navigate to="/login" /> : <Navigate to="/signup" />} */}
          <button
            onClick={() => {
              if (user !== null) {
                setToggle(!toggle);
              } else {
                // <Navigate to="/login" />
                // window.open("http://localhost:3000/login", "_self");
                window.open("https://tuneify-g19.vercel.app/login", "_self");
              }
            }}
          >
            {user === null ? "LOGIN" : "Profile"}
            {/* Profile */}
          </button>
          {toggle === true ? (
            <div className="usermenu">
              <img src={user.picture} alt="profile" />
              <p>{user.name}</p>
              <p onClick={logout} className="logout">
                Log Out
              </p>
            </div>
          ) : (
            <h6 style={{ display: "none" }}>Hi</h6>
          )}
        </div>
      </div>
      {searchtext === "" ? (
        <h6 style={{ display: "none" }}>asada</h6>
      ) : (
        <div className="resultDiv">
          {searchsug &&
            searchsug.map((i) => {
              var sr = i.image[0].link;
              return (
                <div
                  className="recyclerview"
                  style={{ display: "flex" }}
                  onClick={() => {
                    setPlayback({
                      current: {
                        link: i.downloadUrl[1].link,
                        title: i.name,
                        artist: i.primaryArtists,
                        duration: i.duration,
                        icon: i.image[1].link,
                      },
                    });
                    setMusicchanged(!musicChanged);
                    setSearchtext("");
                  }}
                >
                  <img src={sr} alt="" />
                  <div key={i.id}>
                    <h4>{i.name}</h4>
                    <p>{i.primaryArtists}</p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
