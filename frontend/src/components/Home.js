import { Fragment, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AnimeListInput from './AnimeListInput';
import Header from './Header';
import { axiosAuth } from '../utils/axios.util';
import UserAnimeList from './UserAnimeList';

export default function Home() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAnime, setUserAnime] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      return;
    }
    try {
      axiosAuth.get('/api/user').then((data) => {
        setUser((prevUser) => ({ ...prevUser, ...data.data }));
        setIsLoggedIn(true);
      });
    } catch (error) {
      localStorage.removeItem('token');
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    setUser({});
    setIsLoggedIn(false);
  }

  function changeToLoggedIn() {
    setIsLoggedIn(true);
  }

  function changeUserAnime(anime) {
    setUserAnime(anime);
  }

  return (
    <>
      <Header
        loggedIn={isLoggedIn}
        logout={() => logout()}
        afterLogin={() => changeToLoggedIn()}
      />

      <Outlet />
      {/* <AnimeListInput setAnime={(anime) => changeUserAnime(anime)} />
      <UserAnimeList anime={userAnime} /> */}
    </>
  );
}
