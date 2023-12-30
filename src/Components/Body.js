import { useEffect, useState } from "react";
import "./Body.css";
export const Body = ({
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
}) => {
  const [album, setAlbum] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const fetchTrending = async () => {
    const res = await fetch("https://saavn.me/modules?language=hindi", {
      method: "GET",
    });

    const result = await res.json();
    const albums = result.data.albums;
    const playlists = result.data.playlists;
    setAlbum(albums);
    setPlaylist(playlists);
  };

  const gretting = () => {
    var date = new Date();
    var hour = date.getHours();
    console.log(hour);
    if (0 <= hour && 5 > hour) {
      return "Good Night";
    } else if (5 <= hour && 12 > hour) {
      return "Good Morning";
    } else if (12 <= hour && 18 > hour) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const SetPlaylist = async (id) => {
    const res = await fetch("https://saavn.me/playlists?id=" + id, {
      method: "GET",
    });

    const result = await res.json();
    setPlaylistName(result.data.name);
    const playlistSongs = result.data.songs;
  };
  useEffect(() => {
    fetchTrending();
  }, []);
  return (
    <div className="bodydiv">
      <h1>{gretting()}</h1>
      <h2>Albums</h2>
      <div className="albums">
        <div className="card">
          {album &&
            album.map((i) => {
              return (
                <div key={i.id}>
                  <img
                    className="card-image"
                    src={i.image[1].link}
                    alt="cover"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <h3 className="card-title">{i.name}</h3>
                </div>
              );
            })}
        </div>
      </div>
      <h2>Playlists</h2>
      <div className="playlists">
        <div className="card">
          {playlist &&
            playlist.map((i) => {
              return (
                <div key={i.id} onClick={SetPlaylist(i.id)}>
                  <img
                    className="card-image"
                    src={i.image[1].link}
                    alt="cover"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <h3 className="card-title">{i.title}</h3>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
