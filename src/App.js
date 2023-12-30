import React, { useState, useEffect } from "react";
import { Player } from "./Components/Player";
import { Footer } from "./Components/Footer";
import { Sidebar } from "./Components/Sidebar";
import { SearchBar } from "./Components/SearchBar";
import { Body } from "./Components/Body";
import "./App.css";

export const App = ({ token, logout }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [queue, setQueue] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [playback, setPlayback] = useState({
    previous: "",
    current: {
      link: "",
      icon: "",
      artist: "",
      title: "",
      duration: "",
    },
    next: "",
    icon: "",
  });
  const [serachtype, setSearchtype] = useState("");
  const [musicChanged, setMusicchanged] = useState(false);
  const qala =
    "https://spotifymusic.s3.us-west-004.backblazeb2.com/Muqabla.mp3";
  const [isPlaying, setIsPlaying] = useState(false);

  const [currTime, setCurrTime] = useState({
    min: "0",
    sec: "0",
  });
  const [Time, setTime] = useState({
    min: 0,
    sec: 0,
  });
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    // Replace 'YOUR_GENERATED_DOWNLOAD_URL' with the actual generated download URL from Backblaze B2
  }, []);

  function searchChange(value) {
    setSearchtext(value);
  }
  return (
    <>
      {/* <h2>Search Box</h2>
      <input
        type="Text"
        id="search"
        name="search"
        value={searchtext}
        onChange={(e) => setSearchtext(e.target.value)}
      />
      <button type="button" onClick={searchResult}>
        Search
      </button> */}
      <>
        <SearchBar
          playback={playback}
          setPlayback={setPlayback}
          queue={queue}
          setQueue={setQueue}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          seconds={seconds}
          setSeconds={setSeconds}
          Time={Time}
          setTime={setTime}
          currTime={currTime}
          setCurrTime={setCurrTime}
          searchChange={searchChange}
          musicChanged={musicChanged}
          setMusicchanged={setMusicchanged}
          logout={logout}
          token={token}
        />
        <div className="middle">
          <Sidebar
            playback={playback}
            setPlayback={setPlayback}
            queue={queue}
            setQueue={setQueue}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            seconds={seconds}
            setSeconds={setSeconds}
            Time={Time}
            setTime={setTime}
            currTime={currTime}
            setCurrTime={setCurrTime}
          />

          <div className="body">
            <Body
              playback={playback}
              setPlayback={setPlayback}
              queue={queue}
              setQueue={setQueue}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              seconds={seconds}
              setSeconds={setSeconds}
              Time={Time}
              setTime={setTime}
              currTime={currTime}
              setCurrTime={setCurrTime}
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
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              seconds={seconds}
              setSeconds={setSeconds}
              Time={Time}
              setTime={setTime}
              currTime={currTime}
              setCurrTime={setCurrTime}
              musicChanged={musicChanged}
              setMusicchanged={setMusicchanged}
            />
          ) : (
            <h2> </h2>
          )}
        </div>
      </>
    </>
  );
};

// export default App;
