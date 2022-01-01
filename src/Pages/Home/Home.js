import React from 'react';
import useAuth from '../../hooks/useAuth';
import Admin from './Admin/Admin';
import "./Home.css";
import UserHome from './UserHome/UserHome';

const Home = () => {
    const { admin,logout } = useAuth();

    return (
        <div className='home-container'>
            <div className='text-center'>
                <button className='btn btn-primary ms-end' onClick={logout}>Log Out</button>
            </div>
            {
                admin ? <Admin/> : <UserHome/>
            }
        </div>
    );
};

export default Home;