import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { validatePasswords } from '../utils/inputValidation';
import './RegisterModal.css';

export default function RegisterModal({
  open,
  onClose,
  handleRegister,
  error,
  handleClose,
}) {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordsAreEqual, setPasswordsAreEqual] = useState(true);

  useEffect(() => {
    setPasswordsAreEqual(validatePasswords(password1, password2));
  }, [password1, password2]);

  function handleSubmitClick() {
    handleRegister(email, password1);
  }

  function renderError() {
    if (error) {
      return error;
    }
    if (!passwordsAreEqual && password2 && password2) {
      return 'Passwords must match.';
    }
    return '';
  }

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Register
        </Typography>

        <br />

        <TextField
          // doing !!error fixes a react error where the error prop only wants booleans but i am passing a string. !! converts to a boolean from a truthy or falsy value
          label="Email"
          variant="outlined"
          className="modal__input"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <TextField
          error={!passwordsAreEqual && !!(password1 && password2)}
          label="Password"
          variant="outlined"
          className="modal__input"
          type="password"
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />

        <br />

        <TextField
          error={!passwordsAreEqual && !!(password2 && password2)}
          label="Enter password again"
          variant="outlined"
          className="modal__input"
          type="password"
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />

        <span className="error__message">{renderError()}</span>

        <div className="button__wrapper">
          <Button
            variant="contained"
            className="modal__button"
            onClick={() => handleSubmitClick()}
            disabled={!(email && password1 && password2 && passwordsAreEqual)}
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

RegisterModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleRegister: PropTypes.func,
  handleClose: PropTypes.func,
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
