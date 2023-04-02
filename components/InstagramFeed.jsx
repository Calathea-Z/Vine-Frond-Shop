import { useState, useEffect } from "react";
import axios from "axios";

export default function InstagramFeed(getStaticProps) {
  const axios = require('axios')
  const [photos, setPhotos] = useState([]);
  // const url=`https://graph.instagram.com/me/media?fields=media_url,permalink,caption&access_token=${process.env.INSTA_KEY}`

  const getPhotos = async () => {
    axios(`https://graph.instagram.com/me/media?fields=media_url,permalink,caption&access_token=${process.env.INSTA_KEY}`)
    .then(function (res) {
      console.log(res)
      setPhotos(res.data)
    })
    .catch( function (err) {
      console.log(`err in getPhotos : ${err}`)
    })
    // const data = await fetch(url);
    // const images = await data.json();
    // console.log(images);
    // setPhotos(images.data);
    // console.log("hi")
  };

  useEffect(() => {
    getPhotos();
  }, [photos]);

  return (
    <div>
      {/* <div>
        {photos &&
          photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.media_url} alt={photo.caption} />
            </div>
          ))}
      </div> */}
      <div className='flex justify-center items-center gap-2 p-4'>
          <div className='w-[200px] h-[200px] border-4 border-black flex justify-center items-center p-1'>Photos will go here</div>
          <div className='w-[200px] h-[200px] border-4 border-black flex justify-center items-center p-1' >I'm only using one person photos for their site</div>
          <div className='w-[200px] h-[200px] border-4 border-black flex justify-center items-center p-1' >They are the person I am building this site for.</div>
          <div className='w-[200px] h-[200px] border-4 border-black flex justify-center items-center p-1' >The information is the same for both screen-casts requested.</div>
      </div>
    </div>
  );
}
