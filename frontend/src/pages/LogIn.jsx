import React, { useState } from "react";
import useLogin from "../hooks/useLogin"; 
import img from '../assets/bg-image.jpg'


const LogIn = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const { logIn, error, loading } = useLogin(); 
  
    const handleSubmit = async(e) =>{
          e.preventDefault();
          console.log(email, password);
  
            await logIn(email, password);
          };
        
  
    return(
        <div className={`flex justify-center items-center md:h-[100vh] h-[100vh]`} style={{backgroundImage: `url(${img})`,  backgroundPosition: 'center', backgroundSize:'cover'}}>
        <form 
          onSubmit={handleSubmit} 
          className="bg-transparent backdrop-brightness-75 backdrop-blur-md border-b-2 border-r-2  border-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h3 className="text-2xl font-bold text-center text-black mb-6">Log In</h3>
      
          <label className="block text-black font-semibold mb-2">Email:</label>
          <input 
            type="email" 
            onChange={(e) => { setemail(e.target.value) }} 
            value={email} 
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter your email"
          />
      
          <label className="block text-black font-semibold mb-2">Password:</label>
          <input 
            type="password" 
            onChange={(e) => { setpassword(e.target.value) }} 
            value={password} 
            className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter your password"
          />
<button
  type="submit"
  disabled={loading}
  className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
>
  Login
  <svg
    className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
    viewBox="0 0 16 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      className="fill-gray-800 group-hover:fill-gray-800"
    ></path>
  </svg>
</button>
{error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
        </form>
      </div>)
}

export default LogIn