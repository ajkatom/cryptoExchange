import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_KEY;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState('');

  const fetchGifs = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(' ')
          .join('')}&limit=1`
      );
      const { data } = await res.json();
      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      setGifUrl('https://giphy.com/embed/ZVIsy4n8UNLPO');
      console.error(error);
    }
  };
  useEffect(() => {
    return () => {
      if (keyword) fetchGifs();
    };
  }, []);

  return gifUrl;
};

export default useFetch;
