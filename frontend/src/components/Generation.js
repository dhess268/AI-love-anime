import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

import AnimeListInput from './AnimeListInput';
import UserAnimeList from './UserAnimeList';

import './Generation.css';
import { axiosAuth } from '../utils/axios.util';

export default function Generation() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Any');
  const [isLoading, setisLoading] = useState(true);

  const isLoggedIn = useSelector((state) => state.loggedIn.status);
  const selected = useSelector((state) => state.anime.selected);

  useEffect(() => {
    axios
      .get('https://api.jikan.moe/v4/genres/anime?filter=genres')
      .then((data) => {
        setGenres(data.data.data);
        setisLoading(false);
      });
  }, []);

  function renderGenres() {
    return genres.map((genreObject) => (
      <FormControlLabel
        key={genreObject.mal_id}
        value={genreObject.name}
        control={<Radio />}
        label={genreObject.name}
      />
    ));
  }

  function handleGenerate() {
    axiosAuth('/api/gpt', { genre: selectedGenre, list: selected });
  }

  // reminder: add conditional to also display anime that have been recommended if available
  return (
    <Container maxWidth="md">
      <h1>Let's generate your next anime to watch.</h1>
      {!isLoading ? (
        <>
          <section>
            <h2 className="genre__header">What genre piques your interest?</h2>
            <FormControl>
              <FormLabel id="genre-label" sx={{ color: 'white' }}>
                Genre Selection
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="genre-label"
                name="genre-buttons"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <FormControlLabel
                  key="0"
                  value="Any"
                  control={<Radio />}
                  label="Surprise me!"
                />
                {renderGenres()}
              </RadioGroup>
            </FormControl>

            <p className="selected__genre">Selected Genre: {selectedGenre}</p>
          </section>
          <section>
            <h2>Using your anime taste to generate new anime</h2>

            <h3>
              Do you want to use anime from your myanimelist account or search
              manually?
            </h3>
            <FormControl>
              <FormLabel id="anime-label" sx={{ color: 'white' }}>
                Which method?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="anime-label"
                name="genre-buttons"
                defaultValue="yes"
              >
                <FormControlLabel
                  key="yes"
                  value="yes"
                  control={<Radio />}
                  label="Use list from my existing myanimelist account"
                />
                <FormControlLabel
                  key="no"
                  value="no"
                  control={<Radio />}
                  label="Create a list here"
                />
              </RadioGroup>
            </FormControl>
            <AnimeListInput />
            <UserAnimeList />
          </section>

          <section>
            <Button type="button" onClick={() => handleGenerate()}>
              Generate
            </Button>
          </section>
        </>
      ) : (
        <Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName="undefined"
          visible
        />
      )}
    </Container>
  );
}
