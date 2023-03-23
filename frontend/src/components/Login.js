import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    const data = await axios.post('http://localhost:3001/auth/login', {
      username, // varEmail is a variable which holds the email
      password,
    });
    console.log(data);
  }

  return (
    <section>
      <form onSubmit={(e) => handleLogin(e)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
    </section>
  );
}
