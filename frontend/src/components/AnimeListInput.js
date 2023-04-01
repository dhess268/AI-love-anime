import { useState } from 'react';
import { axiosAuth } from '../utils/axios.util';

export default function AnimeListInput() {
  const [username, setUsername] = useState('');

  function handleGetAnimelist() {
    axiosAuth
      .get(`http://localhost:3001/myanimelist?username=${username}`)
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <>
      <input
        placeholder="animeLover29"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="button" onClick={handleGetAnimelist}>
        get
      </button>
    </>
  );
}
