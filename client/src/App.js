import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute component={Home} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/booking/:carid' element={<ProtectedRoute component={BookingCar} />} />
          <Route path='/userbookings' element={<ProtectedRoute component={UserBookings} />} />
          <Route path='/addcar' element={<ProtectedRoute component={AddCar} />} />
          <Route path='/admin' element={<ProtectedRoute component={AdminHome} />} />
          <Route path='/edit' element={<ProtectedRoute component={EditCar} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

export function ProtectedRoute({ component: Component, ...rest }) {
  if (localStorage.getItem('user')) {
    return <Component {...rest} />;
  } else {
    return <Navigate to='/login' />;
  }
}
//npm i aos