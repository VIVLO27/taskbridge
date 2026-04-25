import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('All fields are required');
    try {
      setLoading(true);
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <span className="auth-brand-icon">⚡</span>
          <h1 className="auth-brand-name">TaskBridge</h1>
        </div>
        <h2 className="auth-card__title">Hey, welcome back 👋</h2>
        <p className="auth-card__sub">Good to see you again. Let's get things done.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Your email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button id="login-btn" type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? 'Logging you in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-card__footer">
          New here? <Link to="/register">Create a free account</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
