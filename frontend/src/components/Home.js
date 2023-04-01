import { Fragment, useEffect, useState } from 'react';
import AnimeListInput from './AnimeListInput';
import Header from './Header';
import { axiosAuth } from '../utils/axios.util';

export default function Home() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
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

  return (
    <>
      <Header loggedIn={isLoggedIn} logout={() => logout()} />
      <AnimeListInput />
    </>
  );
}
