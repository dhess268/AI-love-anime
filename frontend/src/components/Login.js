import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  function handleLogout() {
    localStorage.removeItem('token');
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!handleValidation()) {
      console.log(errors);
      return;
    }

    const data = await axios.post('http://localhost:3001/auth/login', {
      email, // varEmail is a variable which holds the email
      password,
    });

    setEmail('');
    setPassword('');

    if (data.data.status === 'success') {
      localStorage.setItem('token', data.data.token);
    }
  }

  function handleValidation() {
    const error = {};
    let formIsValid = true;

    // Email
    if (!email) {
      formIsValid = false;
      errors.email = 'Cannot be empty';
    }

    if (typeof email !== 'undefined') {
      const lastAtPos = email.lastIndexOf('@');
      const lastDotPos = email.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.email = 'Email is not valid';
      }
    }

    setErrors(error);

    return formIsValid;
  }

  return (
    <section>
      <form onSubmit={(e) => handleLogin(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}
