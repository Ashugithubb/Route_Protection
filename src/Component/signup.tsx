import React from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link,useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
 import { useUser } from "./UserData";
import '../Style/signup.css';


const schema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
            "Password must include uppercase, lowercase, number, and special character"
        ),
    confirm: z.string()
}).refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
});

type FormFeilds = z.infer<typeof schema>;

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useUser(); 
    const { register, handleSubmit, formState: { errors } } = useForm<FormFeilds>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFeilds> = (data) => {
        const userData = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        };
        signup(userData); 
        alert("Signup successful!");
        navigate("/login");
    };

    return (
        <>
            <h3>Signup Page</h3>
            <form className='signup' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("fullName")} type="text" placeholder='Full Name' />
                {errors.fullName && <div className='text-red-500'>{errors.fullName.message}</div>}

                <input {...register("email")} type="email" placeholder='Email' />
                {errors.email && <div className='text-red-500'>{errors.email.message}</div>}

                <input {...register("password")} type="password" placeholder='Password' />
                {errors.password && <div className='text-red-500'>{errors.password.message}</div>}

                <input {...register("confirm")} type="password" placeholder='Confirm Password' />
                {errors.confirm && <div className='text-red-500'>{errors.confirm.message}</div>}

                <button id="b11" type="submit">Sign up</button>
                <Link  to="/login">
                    <button id="b21" type="button">Login</button>
                </Link>
            </form>
        </>
    );
}
export default Signup;