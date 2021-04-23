import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                        <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                        <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;