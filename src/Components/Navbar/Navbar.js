
import React, { useState } from 'react';
import './Navbar.css'; 
import logo from '../../assets/images.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt='logfghjo'/>
      </div>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact Us</a>
      </div>
      <div className="navbar-toggler" onClick={toggleNavbar}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
