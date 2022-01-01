import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import "../SignUp.css";

const Rider = () => {
    const [userData, setUserData] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {registerUser} = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        if(data.password !== data.conPassword){
            alert('Your Password does not match');
            return;
        }
        const newData = {...data, type:'rider'}
        setUserData(newData);
        registerUser(userData.email, userData.password, userData.name, userData, navigate);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name", { required: true})} name="name" placeholder="Rider name.."/>
                <input type="text" {...register("email", { required: true})} name="email" placeholder="Rider Email.."/>
                <input type="text" {...register("address", { required: true})} name="address" placeholder="Rider Address.."/>
                <input type="text" {...register("area", { required: true})} name="area" placeholder="Rider Area.."/>
                <input type="text" {...register("phone", { required: true})} name="phone" placeholder="Rider Phone Number.."/>
                <input type="number" {...register("age", { required: true})} name="age" placeholder="Rider Age.."/>
                <label htmlFor="proPic">Profile Picture</label>
                <input type="file" id='proPic' name="profile-picture"  {...register("proPic", { required: true})} placeholder="Rider Profile Picture.."/>
                <label htmlFor="drivingLicence">Driving Licence</label>
                <input type="file" id='drivingLicence' name="driving-licence"  {...register("drivingLicence", { required: true})} placeholder="Rider driving licence picture.."/>
                <label htmlFor="nidPicture">NID Picture</label>
                <input type="file" id='nidPicture' name="nid-picture"  {...register("nid", { required: true})} placeholder="Rider NID Picture.."/>
                <textarea type="text" name="car-information"  {...register("carInformation", { required: true})} placeholder="Rider Car Information (name, model, name palate).." />
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

export default Rider;