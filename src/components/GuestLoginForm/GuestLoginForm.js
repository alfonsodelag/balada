import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../common/services/auth.service';

const GuestLoginForm = ({ handleLoginStatus }) => {
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayError, setDisplayError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await AuthService.loginToken(token);
      if (data) {
        localStorage.setItem('isLoggedIn', 'true');
        handleLoginStatus(true);
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Login failed. Please try again.');
      setDisplayError(true);
    }
  };

  useEffect(() => {
    let timeout;
    if (displayError) {
      timeout = setTimeout(() => {
        setDisplayError(false);
        setErrorMessage('');
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [displayError]);

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <label className="mt-2" htmlFor="token">
        Token:
      </label>
      <input
        className="rounded-md border-gray-400 border-solid border py-2 px-4 mt-2"
        type="text"
        id="token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        type="submit"
      >
        Submit
      </button>
      {displayError && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
};

GuestLoginForm.propTypes = {
  handleLoginStatus: PropTypes.func.isRequired,
};

export default GuestLoginForm;
