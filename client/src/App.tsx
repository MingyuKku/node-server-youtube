import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/about';
import Login from './components/registerLogin';
import Register from './components/registerLogin/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/about' element={ <About /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
      </Routes>
    </div>
  );
}

export default App;
