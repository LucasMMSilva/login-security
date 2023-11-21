
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import InvalidLogin from './pages/InvalidLogin/InvalidLogin';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/invalidlogin' element={<InvalidLogin/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
