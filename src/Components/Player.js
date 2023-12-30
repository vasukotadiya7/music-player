import { useEffect, useState, React, useCallback } from "react";
import useSound from "use-sound"; // for handling the sound
// import qala from "../assets/qala.mp3"; // importing the music
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons";
import "./Player.css";

export const Player = ({
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
}) => {
  const [a, setA] = useState(true);
  var src;
  useEffect(() => {
    src = playback.current.link;
  }, [playback.current.link]);

  useEffect(() => {
    setA(musicChanged);
    setSeconds(0);
    setIsPlaying(false);
    stop();
  }, [musicChanged]);
  src = playback.current.link || "";
  console.log(src);
  const [play, { pause, duration, sound, stop }] = useSound(src);
  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause the audio
      setIsPlaying(false);
    } else {
      play(); // this will play the audio
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // setting the seconds state with the current state
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);
  return (
    <>
      <div className="component">
        {isPlaying ? (
          <img
            src="https://i.postimg.cc/MTMcS6L6/Untitled-design.gif"
            alt="playing"
          />
        ) : (
          <img
            src="https://i.postimg.cc/d3P6ztBd/Untitled-design-4.png"
            alt="paused"
          />
        )}
        <img
          className="musicCover"
          src={
            playback.current.icon ||
            "https://i.postimg.cc/MTVCgbX5/no-music.png"
          }
          alt="coverimage"
        />
        <div className="playingName">
          {playback.current.title.length > 40 ? (
            <marquee>
              <h3 className="title">{playback.current.title}</h3>
            </marquee>
          ) : (
            <h3 className="title">{playback.current.title || "Song Title"}</h3>
          )}
          {playback.current.artist.length > 72 ? (
            <marquee>
              <p className="subTitle">{playback.current.artist}</p>
            </marquee>
          ) : (
            <p className="subTitle">{playback.current.artist || "Artits"}</p>
          )}
        </div>
        <div>
          <div className="time">
            <p>
              {currTime.min}:{currTime.sec}
            </p>
            <input
              type="range"
              id="seconds"
              name="seconds"
              min="0"
              max={duration / 1000}
              default="0"
              value={seconds || "0"}
              className="timeline"
              onChange={(e) => {
                sound.seek([e.target.value]);
              }}
            />
            <p>
              {Time.min}:{Time.sec}
            </p>
          </div>

          <div className="playingButtonDiv">
            <button className="playButton">
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <BiSkipPrevious />
              </IconContext.Provider>
            </button>
            {!isPlaying ? (
              <button className="playButton" onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button className="playButton" onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
            <button className="playButton">
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <BiSkipNext />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
      {
        //<audio controls src={src} autoPlay />
      }
    </>
  );
};
