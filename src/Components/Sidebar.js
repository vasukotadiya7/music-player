import "./Sidebar.css";
export const Sidebar = ({
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
  currentPlaying,
  setCurrentplaying,
}) => {
  const playSongs = () => {
    setPlayback({
      current: {
        link: queue[0].link,
        title: queue[0].title,
        artist: queue[0].artist,
        duration: queue[0].duration,
        icon: queue[0].icon,
        index: 0,
      },
    });

    setTime({
      min: Math.floor(queue[0].duration / 60),
      sec: Math.floor(queue[0].duration % 60),
    });
  };
  console.log(queue);
  console.log(queue.length);
  console.log(playback.current.index);
  return (
    <div className="songname">
      {currentPlaying ? (
        <div className="current">
          <h3>{currentPlaying.title}</h3>
          <img src={currentPlaying.icon} style={{ height: "250px" }} alt="" />
          <img
            src="https://i.postimg.cc/rFWtgfKd/pngegg.png"
            alt="play"
            className="playbutton"
            onClick={playSongs}
          />
        </div>
      ) : (
        {
          /*just'
          making
          stupid
          */
        }
      )}
      {queue &&
        queue.map((i) => {
          return (
            <div key={i.id} style={{ display: "flex" }}>
              <img src={i.iconPreview} style={{ height: "50px" }} alt="" />

              <li
                onClick={() => {
                  setPlayback({
                    current: {
                      link: i.link,
                      title: i.title,
                      artist: i.artist,
                      duration: i.duration,
                      icon: i.icon,
                      index: i.index,
                    },
                  });
                  setTime({
                    min: Math.floor(i.duration / 60),
                    sec: Math.floor(i.duration % 60),
                  });
                  // setMusicchanged(!musicChanged);
                }}
              >
                {i.title}
              </li>
            </div>
          );
        })}
    </div>
  );
};
