import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <span style={{ color: '#667eea' }}>Skill2020</span> {isAdmin ? 'Admin' : 'Academy'}
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${showDropdown ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        {!isAuthenticated ? (
                            <li className="nav-item dropdown">
                                <button
                                    className="btn btn-primary dropdown-toggle ms-lg-3"
                                    type="button"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    Login / Signup
                                </button>
                                <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`} style={{ right: 0, left: 'auto' }}>
                                    <li><h6 className="dropdown-header">Student</h6></li>
                                    <li><Link className="dropdown-item" to="/login" onClick={() => setShowDropdown(false)}>Student Login</Link></li>
                                    <li><Link className="dropdown-item" to="/signup" onClick={() => setShowDropdown(false)}>Student Signup</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><h6 className="dropdown-header">Administrator</h6></li>
                                    <li><Link className="dropdown-item" to="/admin-login" onClick={() => setShowDropdown(false)}>Admin Login</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-signup" onClick={() => setShowDropdown(false)}>Admin Signup</Link></li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item mx-lg-2">
                                    <span className="nav-link text-muted">Hi, {user?.name}!</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={isAdmin ? "/admin-dashboard" : "/dashboard"}>Dashboard</Link>
                                </li>
                                <li className="nav-item ms-lg-3">
                                    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
