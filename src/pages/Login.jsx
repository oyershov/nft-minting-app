import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { fetchLogin } from '../redux/login/actions';
import { MSAuthentication } from '../utils/ms-auth';

function Login() {
  const login = useSelector((state) => state.login);
  const authProvider = useContext(MSAuthentication);

  console.log('authProvider: ', authProvider)
  console.log('login:', login.data)

  const handleLogin = () => {
    fetchLogin(authProvider)
  }

  if (!authProvider) {
    throw new Error('A MSAuthenticationProvider has to be injected to use the login.')
  }

  return (
    <div>
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
