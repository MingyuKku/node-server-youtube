import React from 'react';
import { Route, Routes } from 'react-router-dom';

// 컴포넌트
import Home from './components/home';
const About = React.lazy(() => import('./components/about'));
const Login = React.lazy(() => import('./components/registerLogin'));
const Register = React.lazy(() => import('./components/registerLogin/register'));


function App() {
  return (
    <div className="App">
      <React.Suspense fallback={ <p>로딩중...</p> }>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
