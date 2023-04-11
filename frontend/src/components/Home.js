import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Landing from './Landing';
import { axiosAuth } from '../utils/axios.util';
import { updateUser, removeUser } from '../slices/UserSlice';
import { login, logout } from '../slices/LoggedInSlice';

export default function Home() {
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.loggedIn.status);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      return;
    }
    try {
      axiosAuth.get('/api/user').then((data) => {
        dispatch(updateUser(data.data.user));
        dispatch(login());
      });
    } catch (error) {
      localStorage.removeItem('token');
    }
  }, [dispatch]);

  function logoutUser() {
    localStorage.removeItem('token');
    dispatch(removeUser());
    dispatch(logout());
  }

  // function changeUserAnime(anime) {
  //   setUserAnime(anime);
  // }

  function renderBody() {
    // I'm keeping this in just in case I want to add contditional rendering based on login status here
    return <Outlet />;
  }

  return (
    <>
      <Header
        loggedIn={isLoggedIn}
        logout={() => logoutUser()}
        afterLogin={() => console.log('logged in')}
      />
      {renderBody()}
    </>
  );
}
