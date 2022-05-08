import { useEffect, useState } from "react";

export default function Search() {
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songID, setSongID] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [songPath, setSongPath] = useState("");

  useEffect(() => {
    async function getSongInfo() {
      try {
        if (songPath === "") return;

        let response = await fetch(
          `https://api.genius.com/search?q=${songPath}&access_token=${process.env.REACT_APP_GENIUS_ACCESS_TOKEN}`
        );
        let data = await response.json();
        let searchedSongID = await data.response.hits[0].result.id;
        await setSongID(searchedSongID);
      } catch (err) {
        console.log(err);
      }
    }
    getSongInfo();
  }, [songPath]);

  useEffect(() => {
    async function getSongReleaseDate() {
      try {
        if (songID === "") return;

        let response = await fetch(
          `https://api.genius.com/songs/${songID}?access_token=${process.env.REACT_APP_GENIUS_ACCESS_TOKEN}`
        );
        let data = await response.json();
        await console.log(data.response);
        await setReleaseDate(data.response.song.release_date);
      } catch (err) {
        console.log(err);
      }
    }
    getSongReleaseDate();
  }, [songID]);

  function songUrlPath() {
    let songTitleAndArtist = songTitle.concat(" ", songArtist);
    let songUrl = songTitleAndArtist.split(" ").join("-").toLowerCase();
    setSongPath(songUrl);
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="song-title">Song Title</label>
        <input
          type="text"
          id="song-title"
          name="song-title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          required
        ></input>
        <label for="artist">Artist</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={songArtist}
          onChange={(e) => setSongArtist(e.target.value)}
          required
        ></input>
        <div>
          <button
            type="button"
            type="button"
            onClick={() => {
              songUrlPath();
            }}
          >
            Release Date
          </button>
          <button
            type="button"
            onClick={() => {
              songUrlPath();
            }}
          >
            Release Month
          </button>
          <button
            type="button"
            onClick={() => {
              songUrlPath();
            }}
          >
            Release Year
          </button>
          <button type="button" onClick={() => songUrlPath()}>
            Latest
          </button>
        </div>
      </form>
      <div>song title : {songTitle}</div>
      <div>song artist : {songArtist}</div>
      <div>song ID: {songID}</div>
      <div>song release date: {releaseDate}</div>
      <div>songString = {songPath}</div>
    </div>
  );
}
