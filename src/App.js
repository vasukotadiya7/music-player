import React, { useState, useEffect } from "react";
import { Player } from "./Components/Player";
import { Sidebar } from "./Components/Sidebar";
import { SearchBar } from "./Components/SearchBar";
import { Body } from "./Components/Body";

import "./App.css";

export const App = ({ user }) => {
  // window.addEventListener("beforeunload", function (e) {
  //   e.preventDefault();
  //   console.log("tab colsed ");
  //   e.returnValue = "";
  // });
  const [queue, setQueue] = useState([]);
  const [currentPlaying, setCurrentplaying] = useState({
    title: "",
    icon: "",
    type: "",
    id: "",
  });
  const [searchtext, setSearchtext] = useState("");
  const [playback, setPlayback] = useState({
    previous: "",
    current: {
      link: "",
      icon: "",
      artist: "",
      title: "",
      duration: "",
      index: 0,
    },
    next: "",
    icon: "",
  });
  const [serachtype, setSearchtype] = useState("");
  const [musicChanged, setMusicchanged] = useState(false);

  // useEffect(() => {
  //   console.log("song Changed");
  //   console.log(playback.current);
  //   updateCurr();
  // }, [playback.current]);
  // useEffect(() => {
  //   console.log("type changed");
  //   console.log(currentPlaying);
  // }, [currentPlaying]);

  // const updateCurr = async () => {};
  function searchChange(value) {
    setSearchtext(value);
  }
  const database = async (email, name) => {
    const res2 = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      body: JSON.stringify({ useremail: email, username: name }),
      headers: { "Content-Type": "application/json" },
    });
    const result1 = await res2.json();
    if (!result1.success) {
      // logout()
    }
  };
  database(user.email, user.name);
  return (
    <>
      <SearchBar
        playback={playback}
        setPlayback={setPlayback}
        searchChange={searchChange}
        musicChanged={musicChanged}
        setMusicchanged={setMusicchanged}
        user={user}
      />
      <div className="middle">
        {queue ? (
          <Sidebar
            playback={playback}
            setPlayback={setPlayback}
            queue={queue}
            setQueue={setQueue}
            musicChanged={musicChanged}
            setMusicchanged={setMusicchanged}
            currentPlaying={currentPlaying}
            setCurrentplaying={setCurrentplaying}
          />
        ) : (
          {
            /*
sdkfsfl
          */
          }
        )}

        <div className="body">
          <Body
            playback={playback}
            setPlayback={setPlayback}
            queue={queue}
            setQueue={setQueue}
            currentPlaying={currentPlaying}
            setCurrentplaying={setCurrentplaying}
          />
        </div>
      </div>
      <div className="player">
        {playback.current.link ? (
          <Player
            playback={playback}
            setPlayback={setPlayback}
            queue={queue}
            setQueue={setQueue}
            musicChanged={musicChanged}
            setMusicchanged={setMusicchanged}
          />
        ) : (
          <div style={({ background: "rgb(11, 12, 16)" }, { height: "120px" })}>
            <br />
          </div>
        )}
      </div>
    </>
  );
};

// export default App;
