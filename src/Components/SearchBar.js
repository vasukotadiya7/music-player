import { useEffect, useState } from "react";
import "./SearchBar.css";
export const SearchBar = ({
  playback,
  setPlayback,
  queue,
  setQueue,
  isPlaying,
  setIsPlaying,
  currTime,
  setCurrTime,
  seconds,
  setSeconds,
  Time,
  setTime,
  musicChanged,
  setMusicchanged,
  logout,
  token,
  searchChange,
}) => {
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const fetchUser = async () => {
    const res = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const result = await res.json();
    setUsername(result.display_name);
    setUserid(result.id);
    console.log(result.display_name);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const [searchtext, setSearchtext] = useState("");
  const [searchsug, setSearchsug] = useState([]);
  const searchResult = async (e) => {
    console.log(searchtext);
    const res = await fetch(
      "https://saavn.me/search/songs?query=" + searchtext + "&page=1&limit=2",
      // "https://saavn.me/search/songs?query=kesariya&page=1&limit=2",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await res.json();
    if (result.status !== "SUCCESS") {
      alert("No Song Found ! Please check Spelling Mistake ._. ");
    } else {
      alert("Successed");
      const current = {
        icon: result.data.results[0].image[1].link,
        artist: result.data.results[0].primaryArtists,
        title: result.data.results[0].name,
        duration: result.data.results[0].duration,
        link: result.data.results[0].downloadUrl[1].link,
      };
      setPlayback({
        current: current,
        // current: result.data.results[0].downloadUrl[1].link,
        // playback.current:result.data.results[0].downloadUrl[1],
      });
      setIsPlaying(false);
      setMusicchanged(!musicChanged);
      setSearchtext("");
      setTime({
        min: Math.floor(current.duration / 60),
        sec: Math.floor(current.duration % 60),
      });
      // playback.current = result.data.results[0].downloadUrl[1].link;
      console.log(playback);
    }
  };
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
      // console.log(searchsug[0].name);
    } else {
      // alert("No Song Found !");
      // setSearchtext("");
    }
  };

  return (
    <>
      <div className="searchbar">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/232px-Spotify_icon.svg.png" />
        <div className="searchabrandbutton">
          <select id="searchType">
            <option value="song">song</option>
            <option value="artist">artist</option>
            <option value="album">album</option>
            <option value="playlist">playlist</option>
          </select>
          <input
            type="Text"
            id="searchtext"
            name="searchtext"
            value={searchtext}
            onChange={handleChange}
            placeholder="Type Something"
          />
          <button type="submit" onClick={searchResult}>
            &#128269;
          </button>
        </div>
        <div className="userdetails">
          <h2>{username}</h2>
          <img
            onClick={logout}
            src="https://i.postimg.cc/xdmhcV7b/Untitled-design-5.png"
            alt="logout"
          />
        </div>
      </div>
      {searchtext === "" ? (
        <br />
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
                    setTime({
                      min: Math.floor(i.duration / 60),
                      sec: Math.floor(i.duration % 60),
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
    </>
  );
};
