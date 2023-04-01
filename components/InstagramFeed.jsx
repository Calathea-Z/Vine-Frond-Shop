import { useState, useEffect } from "react";
import axios from "axios";

export default function InstagramFeed(getStaticProps) {
  const axios = require('axios')
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    axios(`https://graph.instagram.com/me/media?fields=media_url,permalink,caption&access_token=${process.env.INSTA_KEY}`)
    .then(function (res) {
      console.log(res)
      setPhotos(res.data)
    })
    .catch( function (err) {
      console.log(err)
    })
    // const data = await fetch(url);
    // const images = await data.json();
    // console.log(images.data);
    // setPhotos(images.data);
    // console.log("hi")
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div>
      <div>
        {photos &&
          photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.media_url} alt={photo.caption} />
            </div>
          ))}
      </div>
    </div>
  );
}
