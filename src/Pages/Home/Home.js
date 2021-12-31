import React from 'react';
import useAuth from '../../hooks/useAuth';

const Home = () => {const { logout} = useAuth();
    return (
        <div>
            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default Home;