import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError('All fields are required');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    try {
      setLoading(true);
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
        <h2 className="auth-card__title">Let's get you set up ✌️</h2>
        <p className="auth-card__sub">Takes less than a minute — no fluff, just tasks.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">What should we call you?</label>
            <input
              id="reg-name"
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email address</label>
            <input
              id="reg-email"
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
            <label className="form-label" htmlFor="reg-password">Pick a password</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </div>
          <button id="register-btn" type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? 'Setting things up…' : 'Get Started'}
          </button>
        </form>

        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Sign in instead</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
