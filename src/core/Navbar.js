import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import * as authService from '../services/auth-service';

function Navbar() {
    const { user, signout } = useAuth();

    const isAuthenticated = () => authService.isAuthenticated();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Navbar
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        {!isAuthenticated() && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        className="nav-link"
                                        to="/signin"
                                    >
                                        Signin
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        className="nav-link"
                                        to="/signup"
                                    >
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        className="nav-link"
                                        to={`/user/${user._id}`}
                                    >
                                        {user.name}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-primary me-3"
                                        onClick={signout}
                                    >
                                        Sign Out
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

export default Navbar;
