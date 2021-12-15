import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import {
  MSAuthentication,
  MSAuthenticationProvider,
  MSAuthenticationProviderSymbol
} from './utils/ms-auth'

function App() {
  const authProvider = new MSAuthenticationProvider();

  return (
    <MSAuthentication.Provider value={authProvider}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </MSAuthentication.Provider>
  );
}

export default App;
