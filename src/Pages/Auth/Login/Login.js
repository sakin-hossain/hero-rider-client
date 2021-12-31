import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {loginUser} = useAuth();
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        loginUser(data.email, data.password, navigate);
    }
    return (
        <div className='auth-container container'>
            <h1>Please Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("email", { required: true})} name="email" placeholder="Rider Email.."/>
                <input type="password" {...register("password", { required: true})} name="password" placeholder="Password.."/>
                {errors && <span className='text-danger fw-bold'>This field is required</span>}
                
                <input type="submit" value="Login"/>
            </form>
            <Link to="/signUp" className='fw-bold'>Not a Member ? Please Register</Link>
        </div>
    );
};

export default Login;