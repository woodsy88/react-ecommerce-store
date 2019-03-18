import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

class Navbar extends Component {
  render() {
    return (
      <nav className = "navbar navbar-expand-lg navbar-light bg-light" >
        <Link to='/'><img src={logo} alt="store" className="navbar-brand"/></Link>

        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">Products</Link>
          </li>
        </ul>

        <Link to='/cart' className="ml-auto">
          <button><i className="fas fa-cart-plus"></i>Cart</button>
        </Link>
      </nav>
    );
  }
}

export default Navbar;