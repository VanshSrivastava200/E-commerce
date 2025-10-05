import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [lformData, setlFormData] = useState({
    email: "",
    password: "",
  });

  const handlelChange = (e) => {
    setlFormData({ ...lformData, [e.target.name]: e.target.value });
  };
  const navigate=useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login',lformData).then((result)=>{
      console.log(result)
        if(result.data==='Success'){
            console.log(true)
            navigate('/Home')
        }
    }).catch((err)=>{
        console.log("login failed",err)
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen backgroundimg">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form
          onSubmit={(e) => {
            handleLogin(e);
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={lformData.email}
            onChange={handlelChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={lformData.password}
            onChange={handlelChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="mt-4 bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
          >
            Login
          </button>
        </form>
        <div className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to='/signup'
            className="text-black font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
