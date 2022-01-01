import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import Login from './Pages/Auth/Login/Login';
import PrivateRoute from './Pages/Auth/PrivateRoute/PrivateRoute';
import SignUp from './Pages/Auth/SignUp/SignUp';
import MakeAdmin from './Pages/Home/Admin/MakeAdmin/MakeAdmin';
import Home from './Pages/Home/Home';
import Payment from './Pages/Home/UserHome/Payment/Payment';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/makeAdmin" element={<MakeAdmin/>}/>
            <Route path="/payment/:id" element={<Payment/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
