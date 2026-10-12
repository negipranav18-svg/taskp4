
import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';

import { auth, db } from './firebase';
import './App.css';

// Navigation bar
function Navbar({ user }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/">DEV@Deakin</Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/post">Post</NavLink>

        {user ? (
          <>
            <span className="nav-user">
              {user.displayName || user.email}
            </span>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink className="nav-signup" to="/signup">
              Sign Up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

// Home page
function Home({ posts }) {
  return (
    <main className="home-page">
      <section className="hero-section">
        <p className="eyebrow">YOUR STUDENT COMMUNITY</p>
        <h1>Welcome to DEV@Deakin</h1>
        <p className="hero-description">
          Share your ideas, discover useful resources,
          and connect with the Deakin student community.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/post">
            Share a Post
          </Link>
          <Link className="secondary-button" to="/search">
            Explore Posts
          </Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <h2>Community Posts</h2>
            <p>Ideas and discussions from the community.</p>
          </div>
          <Link to="/search">View all</Link>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Be the first to share something with the community.</p>
            <Link className="primary-button" to="/post">
              Create the first post
            </Link>
          </div>
        ) : (
          <div className="post-grid">
            {posts.slice(0, 6).map((post) => (
              <article className="post-card" key={post.id}>
                <div className="post-card-top">
                  <span className="post-tag">Community</span>
                  <span className="post-date">
                    {post.createdAt?.toDate
                      ? post.createdAt.toDate().toLocaleDateString()
                      : 'Recently'}
                  </span>
                </div>
                <h3>{post.title}</h3>
                <p className="post-description">{post.content}</p>
                <p className="post-author">
                  Posted by {post.author || 'Student'}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// Sign-up page
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignup(event) {
    event.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(result.user, {
        displayName: name.trim()
      });

      await setDoc(doc(db, 'users', result.user.uid), {
        name: name.trim(),
        email: email.trim(),
        createdAt: serverTimestamp()
      });

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSignup}>
        <Link to="/" className="back-link">← Back to Home</Link>
        <p className="eyebrow">JOIN THE COMMUNITY</p>
        <h1>Create your account</h1>
        <p className="auth-subtitle">
          Sign up to share ideas and connect with students.
        </p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="signup-name">Full name</label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          autoComplete="name"
          required
        />

        <label htmlFor="signup-email">Email address</label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <label htmlFor="confirm-password">Confirm password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Enter password again"
          autoComplete="new-password"
          required
        />

        <button className="primary-button full-button" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

// Login page
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <Link to="/" className="back-link">← Back to Home</Link>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login to DEV@Deakin</h1>
        <p className="auth-subtitle">
          Continue your student community journey.
        </p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <button className="primary-button full-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </main>
  );
}

// Create a community post
function CreatePost({ user }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePost(event) {
    event.preventDefault();
    setError('');

    if (!user) {
      navigate('/login');
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError('Please fill in both the title and description.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'posts'), {
        title: title.trim(),
        content: content.trim(),
        author: user.displayName || user.email,
        authorId: user.uid,
        createdAt: serverTimestamp()
      });

      navigate('/');
    } catch (err) {
      setError('Could not publish your post. Check your Firestore rules.');
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <main className="auth-page">
        <div className="auth-card">
          <h1>Login required</h1>
          <p>Please log in before creating a community post.</p>
          <Link className="primary-button" to="/login">
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <form className="auth-card post-form" onSubmit={handlePost}>
        <Link to="/" className="back-link">← Back to Home</Link>
        <p className="eyebrow">COMMUNITY CONTRIBUTION</p>
        <h1>Create a Post</h1>
        <p className="auth-subtitle">
          Share a question, an idea, or something useful.
        </p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="post-title">Post title</label>
        <input
          id="post-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your post a title"
          maxLength={120}
          required
        />

        <label htmlFor="post-content">Description</label>
        <textarea
          id="post-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What would you like to share?"
          rows={7}
          maxLength={5000}
          required
        />

        <button className="primary-button full-button" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </main>
  );
}

// Search community posts
function Search({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter((post) => {
    const searchText =
      `${post.title} ${post.content} ${post.author}`.toLowerCase();

    return searchText.includes(searchTerm.toLowerCase());
  });

  return (
    <main className="content-page">
      <div className="page-heading">
        <p className="eyebrow">DISCOVER</p>
        <h1>Search Community Posts</h1>
        <p>Find ideas and discussions shared by students.</p>
      </div>

      <input
        className="search-input"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title, description, or author..."
      />

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <h3>No matching posts</h3>
          <p>Try another search term or create a new post.</p>
        </div>
      ) : (
        <div className="post-grid">
          {filteredPosts.map((post) => (
            <article className="post-card" key={post.id}>
              <span className="post-tag">Community</span>
              <h3>{post.title}</h3>
              <p className="post-description">{post.content}</p>
              <p className="post-author">
                Posted by {post.author || 'Student'}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <p>DEV@Deakin — Student Community</p>
      <p>© {new Date().getFullYear()} DEV@Deakin</p>
    </footer>
  );
}

// Main application
function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState('');

  // Watch for login and logout changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // Load posts from Firestore in newest-first order.
  useEffect(() => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        setPosts(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
          }))
        );
        setPostsError('');
      },
      (error) => {
        console.error('Loading posts failed:', error);
        setPostsError(
          'Posts could not load. Check that Firestore exists and its rules permit reading posts.'
        );
      }
    );

    return unsubscribe;
  }, []);

  if (authLoading) {
    return <div className="loading-screen">Loading DEV@Deakin...</div>;
  }

  return (
    <div className="app-shell">
      <Navbar user={user} />

      {postsError && (
        <div className="notice-message">{postsError}</div>
      )}

      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<CreatePost user={user} />} />
        <Route path="/search" element={<Search posts={posts} />} />
        <Route
          path="*"
          element={
            <main className="content-page">
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </main>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
