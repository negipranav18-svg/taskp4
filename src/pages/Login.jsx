
import { Link } from 'react-router-dom';

function Login() {
  function handleSubmit(event) {
    event.preventDefault();

    // Next: validate the form and connect Firebase.
  }

  return (
    <main>
      <h1>Login</h1>
      <p>Welcome back to DEV@Deakin.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Email address
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </label>

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
