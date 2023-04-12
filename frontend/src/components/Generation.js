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
import { ProgressBar, Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

import AnimeListInput from './AnimeListInput';
import UserAnimeList from './UserAnimeList';

import './Generation.css';
import { axiosAuth } from '../utils/axios.util';

export default function Generation() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Any');
  const [isLoading, setisLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
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
    setIsGenerating(true);
    try {
      axiosAuth
        .post('/api/gpt', { genre: selectedGenre, list: selected })
        .then((data) => {
          console.log(data.data);
          if (typeof data.data === 'string') {
            const startIndex = data.data.indexOf('{');
            const endIndex = data.data.lastIndexOf('}');
            const jsonString = data.data.slice(startIndex, endIndex + 1);
            const js = JSON.parse(jsonString);
            setRecommendations(js.recommendations);
          } else {
            setRecommendations(data.data.recommendations);
          }
          setIsGenerating(false);
        });
    } catch (error) {
      alert('An error has occured please try to generate again');
      setIsGenerating(false);
    }
  }

  function renderRecommendations() {
    return recommendations.map((anime) => (
      <div key={`${anime.title}100`} className="recommendation">
        <span>Anime Name: {anime.title}</span>
        <p>{anime.explanation}</p>
      </div>
    ));
  }

  // reminder: add conditional to also display anime that have been recommended if available
  return (
    <Container maxWidth="md" sx={{ marginBottom: '5em' }}>
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

            {/* <h3>
              Do you want to use anime from your myanimelist account or search
              manually?
            </h3> */}
            {/* <FormControl>
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
            </FormControl> */}
            <AnimeListInput />
            <UserAnimeList />
          </section>

          <section className="generate-button__container">
            {isLoggedIn ? (
              <Button
                type="button"
                color="success"
                variant="contained"
                disabled={!!selectedGenre && selected.length < 1}
                onClick={() => handleGenerate()}
              >
                Generate Recommendations
              </Button>
            ) : (
              <Button
                type="button"
                color="success"
                variant="contained"
                disabled
              >
                Log in to start
              </Button>
            )}
          </section>
          {isGenerating && (
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          )}
          <section>
            <h2>Recommendations</h2>
            {renderRecommendations()}
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
