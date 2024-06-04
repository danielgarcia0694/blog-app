import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar">
      <Link to="/"><div className="logo"></div></Link>
      <div class="input-container">
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
    </nav>
  );
};

export default Navbar;
