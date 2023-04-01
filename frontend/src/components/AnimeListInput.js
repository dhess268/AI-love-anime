import { Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { axiosAuth } from '../utils/axios.util';

import './AnimeListInput.css';

export default function AnimeListInput() {
  const [username, setUsername] = useState('');

  function handleGetAnimelist() {
    axiosAuth
      .put(`http://localhost:3001/myanimelist?username=${username}`)
      .then((data) => {
        console.log(data);
      });
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
    </Container>
  );
}
