import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GuestLoginForm from '../../components/GuestLoginForm/GuestLoginForm';
import LoginForm from '../../components/LoginForm/LoginForm';

const Login = ({ handleLoginStatus }) => {
  const [isGuest, setIsGuest] = useState(false);

  const handleToggleGuest = () => {
    setIsGuest((prevIsGuest) => !prevIsGuest);
  };

  return (
    <div className="rounded-md p-4 shadow-md flex flex-col w-full md:w-1/4 m-auto">
      <h2 className="text-center">Login</h2>
      {isGuest ? (
        <GuestLoginForm handleLoginStatus={handleLoginStatus} />
      ) : (
        <LoginForm
          onToggleGuest={handleToggleGuest}
          handleLoginStatus={handleLoginStatus}
        />
      )}
    </div>
  );
};

Login.propTypes = {
  handleLoginStatus: PropTypes.func.isRequired,
};

export default Login;
