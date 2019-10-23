import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store&apos;s inventory</p>
    <button
      type="button"
      className="github"
      onClick={() => authenticate('Github')}
    >
      Log In with GitHub
    </button>
    <button
      type="button"
      className="google"
      onClick={() => authenticate('Google')}
    >
      Log In with Google
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
