import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import bike from "./../../../images/bike.png";
import car from "./../../../images/car.png";
import "./UserHome.css";

const UserHome = () => {
    const [users, setUsers] = useState({});
    const {user} = useAuth();
    useEffect(()=>{
        fetch(`https://guarded-inlet-37110.herokuapp.com/users`)
        .then(res => res.json())
        .then(data=> {
            setUsers(data.result.find(u => u.email === user.email))
        });
    },[]);
    
    const handleCarOrder = () => {
        const data = {
            name: "car",
            price: "200",
            email: user.email
        }
        axios.post('https://guarded-inlet-37110.herokuapp.com/orders', data)
        .then()
    }
    const handleBikeOrder = () => {
        const data = {
            name: "bike",
            price: "100",
            email: user.email
        }
        axios.post('https://guarded-inlet-37110.herokuapp.com/orders', data)
        .then()
    }

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <h1>{users?.name}</h1>
            <h2>{users?.email}</h2>
            <h3>{users?.phone}</h3>
            <h4>{users?.address}</h4>
            <h6>Thanks for join with us as a {users.type}</h6>
            {
                users.type==='learner' &&
                <div className='learner-package'>
                    <div className='package'>
                        <img width="100%" src={bike} alt="bike" />
                        <h3>Bike</h3>
                        <p>$100</p>
                        <Link to="/payment/bike">
                            <button onClick={handleBikeOrder} className="btn btn-primary">Book</button>
                        </Link>
                    </div>
                    <div className='package'>
                        <img width="100%" src={car} alt="car" />
                        <h3>Car</h3>
                        <p>$200</p>
                        <Link to="/payment/car">
                            <button onClick={handleCarOrder} className="btn btn-primary">Book</button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserHome;