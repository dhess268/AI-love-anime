import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { axiosAuth } from '../utils/axios.util';

import './AnimeListInput.css';
import { updateAnime } from '../slices/UserSlice';
import { updateMyanimelist } from '../slices/AnimeSlice';

export default function AnimeListInput() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  function handleGetAnimelist() {
    axiosAuth.put(`/myanimelist?username=${username}`).then((data) => {
      dispatch(updateAnime(data.data.anime));
      dispatch(updateMyanimelist(data.data.anime));
    });
  }

  // async function getSavedAnime() {
  //   try {
  //     const anime = await axiosAuth
  //       .get('/api/user/anime')
  //       .then((data) => data.data.anime);
  //     dispatch(updateAnime(anime));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="list__container">
      <TextField
        placeholder="MyAnimeList username"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        className="list__input"
      />
      <Button
        type="button"
        color="success"
        variant="contained"
        onClick={() => handleGetAnimelist()}
        className="list__button"
      >
        Submit
      </Button>
    </div>
  );
}

AnimeListInput.propTypes = {
  // setAnime: PropTypes.func,
};
