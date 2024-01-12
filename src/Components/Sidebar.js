import "./Sidebar.css";
export const Sidebar = ({
  playback,
  setPlayback,
  queue,
  setTime,
  currentPlaying,
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
  };

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
