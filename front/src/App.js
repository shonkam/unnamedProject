import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import LinkHeader from './components/linkHeader';
import SignUp from './components/signUp';

function App() {

  return (
    <BrowserRouter>
      <LinkHeader />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route exact path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
