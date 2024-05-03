import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Customer from './Customer';
import Home from './Home';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
     <BrowserRouter>
     <Appheader></Appheader>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/customer' element={<Customer/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
