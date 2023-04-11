import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import './Header.css';

import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { axiosAuth } from '../utils/axios.util';

import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import { updateUser } from '../slices/UserSlice';
import { login } from '../slices/LoggedInSlice';

export default function Header({ loggedIn, logout }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [modalError, setModalError] = useState('');

  const dispatch = useDispatch();

  function handleOpenLogin() {
    setOpenLogin(true);
    setModalError('');
  }

  function handleCloseLogin() {
    setOpenLogin(false);
    setModalError('');
  }

  function handleOpenRegister() {
    setOpenRegister(true);
    setModalError('');
  }

  function handleCloseRegister() {
    setOpenRegister(false);
    setModalError('');
  }

  function handleLogout() {
    logout();
  }

  async function handleLogin(email, password) {
    try {
      const data = await axiosAuth.post('/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.data.token);
      console.log(data.data);
      dispatch(updateUser(data.data));
      dispatch(login());
      handleCloseLogin();
    } catch (error) {
      console.log(error);
      setModalError('Incorrect Email or Password. Please try again.');
    }
  }

  async function handleRegister(email, password) {
    try {
      const data = await axiosAuth.post('/auth/register', {
        email,
        password,
        username: 'DEFAULT',
      });
      // note: I want to synchronize my sever returns. For registration its email, id, token and login its just token
      localStorage.setItem('token', data.data.user.token);
      dispatch(updateUser(data.data));
      dispatch(login());
      handleCloseRegister();
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setModalError('The email you entered is already in use. ');
      } else {
        setModalError('An error has occured please try again.');
      }
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI Love Anime
        </Typography>
        {!loggedIn ? (
          <>
            <Button
              color="inherit"
              onClick={() => handleOpenLogin()}
              className="header__button"
            >
              Login
            </Button>
            <span className="header__divider">|</span>
            <Button
              color="inherit"
              onClick={() => handleOpenRegister()}
              className="header__button"
            >
              Register
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => handleLogout()}
            className="header__button"
          >
            Logout
          </Button>
        )}
      </Toolbar>

      <LoginModal
        open={openLogin}
        onClose={() => handleCloseLogin()}
        handleLogin={(email, password) => handleLogin(email, password)}
        error={modalError}
        handleClose={() => handleCloseLogin()}
      />
      <RegisterModal
        open={openRegister}
        onClose={() => handleCloseRegister()}
        handleRegister={(email, password) => handleRegister(email, password)}
        error={modalError}
        handleClose={() => handleCloseRegister()}
      />
    </AppBar>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
};
