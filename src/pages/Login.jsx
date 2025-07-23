import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

//validation
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(4, 'Minimum 4 characters').required('Password is required'),
});

const Login=()=>{
    const navigate =useNavigate();
    const{
        register,
        handleSubmit,
        formState:{errors,isSubmitting},
    }= useForm({
    resolver: yupResolver(schema),
  });
//   Form Submission
const onSubmit = async (data) => {
    try {
      const res = await axios.post('https://reqres.in/api/login', {
      email: data.email,
      password: data.password
     }, 
     {
     headers: {
     'x-api-key': 'reqres-free-v1'
     }
      });
      const token= res.data.token;
    localStorage.setItem("token", res.data.token);
    console.log("logined")
    navigate("/dashboard");
    }
    catch(errors){
     alert('Login failed. Please check your email and password.');
    }
}
return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <Link to="/register" className="text-blue-600 underline">Don't have an account? Register</Link>
      </form>
    </div>
  );
};

export default Login;

