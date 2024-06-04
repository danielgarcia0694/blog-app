import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import './FloatingButton.css';

const FloatingButton = () => {
  return (
    <Link to="/new-post" className="floating-button">
      <div className="circle-button"><FaPlus /></div>
    </Link>
  );
};

export default FloatingButton;
