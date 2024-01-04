import { useEffect, useState, React } from "react";

import "./Player.css";
import palette from "palette.js";
export const Player = ({
  playback,
  setPlayback,
  queue,
  setQueue,
  // isPlaying,
  // setIsPlaying,
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
    setImageUrl(src);
  }, [playback.current.link]);

  useEffect(() => {
    setA(musicChanged);
    setSeconds(0);
    // setIsPlaying(false);
  }, [musicChanged]);
  src = playback.current.link || "";
  console.log(src);

  const [imageUrl, setImageUrl] = useState("");
  const [paletteColors, setPaletteColors] = useState([]);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.onload = () => {
        const colors = palette(img);
        setPaletteColors(colors);
        console.log(colors);
      };
      img.src = src;
    }
  }, [imageUrl]);
  useEffect(() => {}, [playback.current.index]);
  var music = document.getElementById("music");
  if (music) {
    music.addEventListener("ended", () => {
      setindex();
    });
  }
  document.addEventListener(
    "keydown",
    function (event) {
      if (event.keyCode === 176) {
        alert("next was pressed");
      } else if (event.keyCode === 177) {
        alert("previous was pressed");
      } else if (event.keyCode === 178) {
        alert("stop was pressed");
      } else if (event.keyCode === 179) {
        alert("play was pressed");
      }
    },
    true
  );
  const setindex = () => {
    var index = playback.current.index;
    if (queue && index < queue.length - 1) {
      index++;
      setPlayback({
        current: {
          link: queue[index].link,
          title: queue[index].title,
          artist: queue[index].artist,
          duration: queue[index].duration,
          icon: queue[index].icon,
          index: index,
        },
      });
    }
  };
  const setindexpre = () => {
    var index = playback.current.index;
    if (queue && index < queue.length && index !== 0) {
      index--;
      setPlayback({
        current: {
          link: queue[index].link,
          title: queue[index].title,
          artist: queue[index].artist,
          duration: queue[index].duration,
          icon: queue[index].icon,
          index: index,
        },
      });
    }
  };
  return (
    <>
      <div className="component">
        <div className="firstdiv">
          <div>
            <img
              className="musicCover"
              src={
                playback.current.icon ||
                "https://i.postimg.cc/MTVCgbX5/no-music.png"
              }
              alt="coverimage"
            />
          </div>
          <div className="playingName">
            {playback.current.title.length > 40 ? (
              <marquee>
                <h3 className="title">{playback.current.title}</h3>
              </marquee>
            ) : (
              <h3 className="title">
                {playback.current.title || "Song Title"}
              </h3>
            )}
            {playback.current.artist.length > 72 ? (
              <marquee>
                <p className="subTitle">{playback.current.artist}</p>
              </marquee>
            ) : (
              <p className="subTitle">{playback.current.artist || "Artits"}</p>
            )}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <img
            src="https://i.postimg.cc/QC75Ys0K/multimedia-previous-song-button-icon-149086.png"
            style={{ height: "30px", width: "30px" }}
            alt="previous"
            onClick={setindexpre}
          />
          <img
            src="https://i.postimg.cc/MTD4Nb4S/multimedia-next-song-button-icon-149087.png"
            alt="next"
            onClick={setindex}
            style={{ height: "30px", width: "30px" }}
          />
        </div>
        <audio controls src={src} autoPlay id="music" />
      </div>
    </>
  );
};
