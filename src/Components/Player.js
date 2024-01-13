import { useEffect, useState, React } from "react";

import "./Player.css";
export const Player = ({
  playback,
  setPlayback,
  queue,
  setSeconds,
  musicChanged,
}) => {
  const audio = document.getElementById("music");
  // const currentTrack = {
  //   title: "Song Title",
  //   artist: "Artist Name",
  //   album: "Album Name",
  //   // other metadata fields
  // };

  navigator.mediaSession.setActionHandler("play", function () {
    // Handle play action
    audio.play();
  });

  navigator.mediaSession.setActionHandler("pause", function () {
    // Handle pause action
    audio.pause();
  });
  navigator.mediaSession.setActionHandler("previoustrack", function () {
    // Handle previous track action
    setindexpre();
    // Update metadata and start playback of the previous track
  });

  navigator.mediaSession.setActionHandler("nexttrack", function () {
    // Handle next track action
    setindex();
    // Update metadata and start playback of the next track
  });
  const [a, setA] = useState(true);
  var src;
  useEffect(() => {
    src = playback.current.link;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: playback.current.title,
      artist: playback.current.artist,
      artwork: [
        {
          src: playback.current.icon,
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: playback.current.icon,
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: playback.current.icon,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: playback.current.icon,
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: playback.current.icon,
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: playback.current.icon,
          sizes: "512x512",
          type: "image/png",
        },
      ],
      // other metadata fields
    });
  }, [playback.current.link]);

  useEffect(() => {
    setA(musicChanged);
    // setIsPlaying(false);
  }, [musicChanged]);
  src = playback.current.link || "";

  useEffect(() => {}, [playback.current.index]);
  var music = document.getElementById("music");
  if (music) {
    music.addEventListener("ended", () => {
      setindex();
    });
  }
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
