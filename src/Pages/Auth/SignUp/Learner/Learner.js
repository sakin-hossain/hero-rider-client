import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const Learner = () => {
    const [userData, setUserData] = useState({})
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const {registerUser} = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        if(data.password !== data.conPassword){
            alert('Your Password does not match');
            return;
        }
        const newData = {...data, type:'learner'}
        setUserData(newData);
        registerUser(userData.email, userData.password, userData.name, navigate);

        axios.post('http://localhost:5000/users', userData)
        .then(res => {
            if(res.data.acknowledged){
                window.confirm('Register Successfully');
                reset();
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} name="name" placeholder="Learner name.."/>
                <input type="text" {...register("email")} name="email" placeholder="Learner Email.."/>
                <input type="text" {...register("address")} name="address" placeholder="Learner Email.."/>
                <input type="number" {...register("phone")} name="phone" placeholder="Learner Phone Number.."/>
                <input type="number" {...register("age")} name="age" placeholder="Learner Age.."/>
                <label htmlFor="proPic">Profile Picture</label>
                <input type="file" id='proPic' name="profile-picture"  {...register("proPic")} placeholder="Learner Profile Picture.."/>
                <label htmlFor="nidPicture">NID Picture</label>
                <input type="file" id='nidPicture' name="nid-picture"  {...register("nid")} placeholder="Learner NID Picture.."/>
                <textarea type="text" name="car-information"  {...register("carInformation")} placeholder="Learner Car Information (name, model, name palate).." />
                <input type="password" {...register("password")} name="password" placeholder="Password.."/>
                <input type="password" {...register("conPassword")} name="conPassword" placeholder="Confirm Password.."/>
                <select {...register("vehicleType")} name="vehicleType">
                    <option value="bike">Male</option>
                    <option value="car">Female</option>
                </select>
                {errors && <span className='text-danger fw-bold'>This field is required</span>}
                
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default Learner;