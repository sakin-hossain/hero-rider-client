import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51KCverF0oMLyXksOK8BItgsbMozxGCVJEDSyjRi09hSzNPZEoUEKn2FaIVt13VykvW21pUCCSuw7z6ywmcMTeAot00180XR1Bj')

const Payment = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const [order, setOrder] = useState({});

    useEffect(
        ()=>{
            fetch(`https://guarded-inlet-37110.herokuapp.com/orders/${user.email}`)
        .then(res => res.json())
        .then(data=> setOrder(data));
        }
        ,[user.email]);
    return (
        <div className='text-center'>
            <h2>Please pay for {id} package</h2>
            <h4>Pay: ${order.price}</h4>
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    order={order}
                />
            </Elements>
        </div>
    );
};

export default Payment;