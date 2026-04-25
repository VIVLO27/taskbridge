import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" title="Built by Vivek Padhiyar">
          <span className="navbar__brand-icon">⚡</span>
          TaskBridge
        </Link>
        <div className="navbar__actions">
          {user && (
            <span className="navbar__user">Hi, {user.name.split(' ')[0]} 👋</span>
          )}
          <button
            id="theme-toggle"
            className="btn btn-ghost btn-icon"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle dark/light mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {user && (
            <button
              id="logout-btn"
              className="btn btn-ghost"
              onClick={logout}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
