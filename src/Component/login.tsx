import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login } from '../redux/slice/userSlice';

import '../Style/login.css';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.user);

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        dispatch(login(data));

       

        setTimeout(() => {
          if (isAuthenticated) {
            navigate('/home');
          } else {
            setError('email', { message: 'Invalid email or password' });
            setError('password', { message: '' });
          }
        }, 500); 
    };

    return (
        <>
            <div className='login-container'>
                <form className='login' onSubmit={handleSubmit(onSubmit)}>
                    <h3>Login Page</h3>
                    <input id="email" {...register("email")}
                        type="email" placeholder='Email' />
                    {errors.email && <div className='text-red-500'>{errors.email.message}</div>}

                    <input id="pass" {...register("password")}
                        type="password" placeholder='Password' />
                    {errors.password && <div className='text-red-500'>{errors.password.message}</div>}

                    <button id="b1" type="submit" disabled={isSubmitting}>Login</button>
                    <Link to="/signup">
                        <button id="b2" type="button">Sign up</button>
                    </Link>
                </form>
            </div>
        </>
    );
};

export default Login;
