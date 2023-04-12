import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import './LoginModal.css';

export default function LoginModal({
  open,
  handleLogin,
  error,
  handleClose,
  onClose,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmitClick() {
    handleLogin(email, password);
  }

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal__body"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>

        <br />

        <TextField
          // doing !!error fixes a react error where the error prop only wants booleans but i am passing a string. !! converts to a boolean from a truthy or falsy value
          error={!!error}
          label="Email"
          variant="outlined"
          className="modal__input"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <TextField
          error={!!error}
          label="Password"
          variant="outlined"
          className="modal__input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="error__message">{error}</span>

        <div className="button__wrapper">
          <Button
            variant="contained"
            className="modal__button"
            onClick={() => handleSubmitClick()}
            disabled={!(email && password)}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="error"
            className="modal__button"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

LoginModal.propTypes = {
  open: PropTypes.bool,
  handleLogin: PropTypes.func,
  handleClose: PropTypes.func,
  onClose: PropTypes.func,
  error: PropTypes.string,
};

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '1em',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
