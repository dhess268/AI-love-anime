import { Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { axiosAuth } from '../utils/axios.util';

import './AnimeListInput.css';
import { updateAnime } from '../slices/UserSlice';

export default function AnimeListInput() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  function handleGetAnimelist() {
    axiosAuth.put(`/myanimelist?username=${username}`).then((data) => {
      console.log(data.data.anime.length);
      dispatch(updateAnime(data.data.anime));
    });
  }

  async function getSavedAnime() {
    try {
      const anime = await axiosAuth
        .get('/api/user/anime')
        .then((data) => data.data.anime);

      console.log(anime.length);
      dispatch(updateAnime(anime));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container maxWidth="sm" className="list__container">
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
      <Button
        type="button"
        color="success"
        variant="contained"
        onClick={() => getSavedAnime()}
        className="list__button"
      >
        Get Anime from user
      </Button>
    </Container>
  );
}

AnimeListInput.propTypes = {
  // setAnime: PropTypes.func,
};
