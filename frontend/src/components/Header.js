import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { axiosAuth } from '../utils/axios.util';

import LoginModal from '../Modals/LoginModal';

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [modalError, setModalError] = useState('');

  function handleOpen() {
    setOpenLogin(true);
    setModalError('');
  }
  function handleClose() {
    setOpenLogin(false);
    setModalError('');
  }

  async function handleLogin(email, password) {
    try {
      const data = await axiosAuth.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.data.token);
      handleClose();
    } catch (error) {
      console.log(error);
      setModalError('Incorrect Email or Password. Please try again.');
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
        <Button color="inherit" onClick={() => handleOpen()}>
          Login
        </Button>
        <span>|</span>
        <Button color="inherit" onClick={() => handleOpen()}>
          Register
        </Button>
      </Toolbar>

      <LoginModal
        open={openLogin}
        onClose={() => handleClose()}
        handleLogin={(email, password) => handleLogin(email, password)}
        error={modalError}
        handleClose={() => handleClose()}
      />
    </AppBar>
  );
}
