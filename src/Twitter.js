import { useEffect } from "react";

export default function Twitter(props) {
  const { songArtist, songTitle, songID } = props;

  useEffect(() => {
    async function getTweets() {
      try {
        if (songArtist === "" || songTitle === "") return;

        let response = await fetch(
          `https://api.twitter.com/2/tweets/search/recent?query=${songArtist}%20${songTitle}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
            },
          }
        );
        let data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getTweets();
  }, [songID]);

  return (
    <div>
      {songArtist} made {songTitle}
    </div>
  );
}
