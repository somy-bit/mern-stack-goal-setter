import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Header from './components/Header';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <div className='flex w-full h-full items-center flex-col'>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>

  );
}

export default App;
