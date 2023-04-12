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

  function handleDemo() {
    axiosAuth.put(`/myanimelist?username=degeneratedodan`).then((data) => {
      dispatch(updateAnime(data.data.anime));
      dispatch(updateMyanimelist(data.data.anime));
    });
  }

  return (
    <div className="list__container">
      <section className="list__area">
        <TextField
          placeholder="MyAnimeList username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          className="list__input"
          style={{
            backgroundColor: 'white',
          }}
        />
      </section>

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
        onClick={() => handleDemo()}
        className="list__button"
      >
        Use my list for demo purposes
      </Button>
    </div>
  );
}

AnimeListInput.propTypes = {
  // setAnime: PropTypes.func,
};
