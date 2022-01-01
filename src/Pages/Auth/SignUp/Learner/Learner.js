import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const Learner = () => {
    const [userData, setUserData] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm();

    const {registerUser} = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(userData);
        if(data.password !== data.conPassword){
            alert('Your Password does not match');
            return;
        }
        const newData = {...data, type:'learner'}
        setUserData(newData);
        registerUser(userData.email, userData.password, userData.name, userData, navigate);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name", { required: true})} name="name" placeholder="Learner name.."/>
                <input type="text" {...register("email", { required: true})} name="email" placeholder="Learner Email.."/>
                <input type="text" {...register("address", { required: true})} name="address" placeholder="Learner Address.."/>
                <input type="number" {...register("phone")} name="phone" placeholder="Learner Phone Number.."/>
                <input type="number" {...register("age", { required: true})} name="age" placeholder="Learner Age.."/>
                <label htmlFor="proPic">Profile Picture</label>
                <input type="file" id='proPic' name="profile-picture"  {...register("proPic", { required: true})} placeholder="Learner Profile Picture.."/>
                <label htmlFor="nidPicture">NID Picture</label>
                <input type="file" id='nidPicture' name="nid-picture"  {...register("nid", { required: true})} placeholder="Learner NID Picture.."/>
                <input type="password" {...register("password", { required: true})} name="password" placeholder="Password.."/>
                <input type="password" {...register("conPassword", { required: true})} name="conPassword" placeholder="Confirm Password.."/>
                <select {...register("vehicleType", { required: true})} name="vehicleType">
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