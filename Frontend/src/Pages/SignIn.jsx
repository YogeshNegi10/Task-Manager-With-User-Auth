import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../utils/api";
import { Navigate } from "react-router";
import { UserContext } from "../main";

const SignIn = () => {
  const { Authenticated, setAuthenticated,loading,setLoading } = useContext(UserContext);
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

  
      toast.success(data.message);
      setLoading(false)
      setAuthenticated(true);
    } catch (error) {
      
      toast.error(error.response.data.message);
      setLoading(false);
      setAuthenticated(false);
    }
  };

  if (Authenticated) return <Navigate to={"/"} />;

  return (
    <div className=" bg-blue-300 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 relative">
        <div className=" bg-yellow-50  relative px-6 py-8 rounded shadow-md text-black w-full bg">
          <h1 className="mb-8 text-3xl text-center">
            <i className="fa-solid fa-user mr-3 text-blue-500"></i>Login
          </h1>
          <form onSubmit={(e) => handleSubmit(e)}>

          <span className=" relative flex justify-between items-center" >
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4  px-10"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Your Email"
            />
            <i className="fa-solid fa-envelope absolute top-4 ml-3 text-lg "></i>
            </span>

            <span className=" relative flex justify-between items-center">
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4 px-9"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Your Password"
            />
            <i className="fa-solid fa-key absolute top-4 ml-3 text-lg "></i>
            </span>

            <button
              type="submit"
              disabled={loading}
              className="active:scale-98 transition-all ease-in-out cursor-pointer w-full text-center py-3 rounded bg-blue-400 text-white hover:bg-green-dark focus:outline-none my-1"
            >
             { loading ?<i class="fa-solid fa-spinner animate-spin text-2xl"></i> : "Login"}
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Didn't have an account?
          <Link
            to="/signup"
            className="no-underline border-b border-blue text-blue ml-3"
          >
            Sign Up
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignIn;
