
import { Link } from 'react-router-dom';

function Signup() {
  function handleSubmit(event) {
    event.preventDefault();

    // Next: validate the fields and connect Firebase.
  }

  return (
    <main>
      <h1>Create an account</h1>
      <p>Join the DEV@Deakin community.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            required
          />
        </label>

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
            placeholder="Create a password"
            required
            minLength={6}
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter your password again"
            required
          />
        </label>

        <button type="submit">Create Account</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default Signup;
