import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navigation = ({ handleLoginStatus }) => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    handleLoginStatus(false);
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <ul className="flex justify-center gap-12">
        <li>
          <Link to="/" className="hover:text-gray-400">
            Artists
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  handleLoginStatus: PropTypes.func.isRequired,
};

export default Navigation;
