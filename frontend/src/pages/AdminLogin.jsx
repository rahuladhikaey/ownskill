import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/helpers';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !passkey) {
      setError('Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      await adminLogin(email, password, passkey);
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.error || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-center mb-2">
                <span style={{ color: '#667eea' }}>Skill2020</span> Admin Portal
              </h2>
              <p className="text-center text-muted small mb-4">Secure Admin Access Only</p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Admin Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Admin Passkey</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter passkey (skill2020)"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                  />
                  <small className="text-muted">
                    🔐 Hidden passkey required for admin access
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Admin Login'}
                </button>
              </form>

              <hr />

              <p className="text-center mb-2">
                <Link to="/login" className="text-decoration-none text-muted">
                  Student Login
                </Link>
              </p>

              <Link to="/" className="btn btn-outline-secondary w-100 mt-3">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
