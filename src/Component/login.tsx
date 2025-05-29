import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {useUser} from './UserData';  
import '../Style/login.css'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFeilds = z.infer<typeof schema>;
const Login = () => {
    const navigate = useNavigate();
    const { login } = useUser(); // Assuming you have a login function in your UserProvider
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFeilds>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFeilds> = (data) => {
         const isLoggedIn = login(data.email, data.password);
      if(isLoggedIn) {  
        navigate('/home');}
    }

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
}
export default Login;