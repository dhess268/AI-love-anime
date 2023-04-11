import { useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import './Landing.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../Modals/LoginModal';

import { updateUser } from '../slices/UserSlice';
import { login } from '../slices/LoggedInSlice';
import { axiosAuth } from '../utils/axios.util';

export default function Landing() {
  const [openLogin, setOpenLogin] = useState(false);
  const [modalError, setModalError] = useState('');

  const isLoggedIn = useSelector((state) => state.loggedIn.status);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleOpenLogin() {
    setOpenLogin(true);
    setModalError('');
  }

  function handleCloseLogin() {
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
      dispatch(updateUser(data.data));
      dispatch(login());
      handleCloseLogin();
    } catch (error) {
      console.log(error);
      setModalError('Incorrect Email or Password. Please try again.');
    }
  }

  function handleGetStarted() {
    if (!isLoggedIn) {
      handleOpenLogin();
    } else {
      navigate('/generate');
    }
  }

  return (
    <div>
      <Container maxWidth="md">
        <section className="container">
          <h1 className="heading">Generate anime recommendations using AI</h1>
          <p className="description">
            Answer simple questions about the kinds of shows you're looking and
            use your existing anime list to be given top of the line
            recommendations
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleGetStarted()}
          >
            {isLoggedIn ? 'Get started' : 'Log in to get started'}
          </Button>
        </section>
      </Container>
      <LoginModal
        open={openLogin}
        onClose={() => handleCloseLogin()}
        handleLogin={(email, password) => handleLogin(email, password)}
        error={modalError}
        handleClose={() => handleCloseLogin()}
      />
    </div>
  );
}
