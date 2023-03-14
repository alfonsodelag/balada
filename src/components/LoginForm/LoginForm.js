import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../common/services/auth.service';

const LoginForm = ({ handleLoginStatus, onToggleGuest }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await AuthService.loginUser(username, password);
      if (data) {
        localStorage.setItem('isLoggedIn', 'true');
        handleLoginStatus(true);
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Invalid username or password');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="username" className="text-gray-700">
        Username:
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="border-gray-400 border-2 rounded-lg p-2 mt-1"
      />
      <label htmlFor="password" className="text-gray-700">
        Password:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="border-gray-400 border-2 rounded-lg p-2 mt-1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={onToggleGuest}
        className="text-blue-500 hover:text-blue-700 font-medium mt-2"
      >
        Login as guest with a token
      </button>
      {errorMessage && (
        <p className="text-red-500 text-center mt-2">{errorMessage}</p>
      )}
    </form>
  );
};

LoginForm.propTypes = {
  handleLoginStatus: PropTypes.func.isRequired,
  onToggleGuest: PropTypes.func.isRequired,
};

export default LoginForm;
