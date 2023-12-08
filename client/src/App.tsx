import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';


// hoc


// 컴포넌트
import Home from './components/home';
import NavBar from './components/navBar';
import Auth from './router/auth';
import Blocking from './router/blocking';

// hook
import useUserCheck from './hooks/useUserCheck';


// MUI


// Lazy 컴포넌트
const About = React.lazy(() => import('./components/about'));
const Login = React.lazy(() => import('./components/registerLogin'));
const Register = React.lazy(() => import('./components/registerLogin/register'));
const VideoUpLoad = React.lazy(() => import('./components/videoUpload'));



function App() {

  useUserCheck();

  return (
    <div className="App">
      <NavBar />
      <main style={{
        'paddingTop': '64px'
      }}>
        <React.Suspense fallback={ <p>로딩중...</p> }>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route element={ <Auth /> }>
              <Route path='/about' element={ <About /> } />
              <Route path='/video/upload' element={ <VideoUpLoad /> } />
            </Route>
            <Route element={ <Blocking /> }>
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
            </Route>
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;
