import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { server } from "../../utils/api";
import { UserContext } from "../main";



const SignUp = () => {
  const { Authenticated, setAuthenticated, setLoading, loading } =
    useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
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
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
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
      setLoading(false);
      setAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setAuthenticated(false);
    }
  };

  if (Authenticated) return <Navigate to={"/"} />;

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col bg-blue-300 ">
      <div className="container max-w-sm  mx-auto flex-1 flex flex-col items-center justify-center px-2 relative">
        <div className=" bg-yellow-50 relative  px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">
            <i className="fa-solid fa-user-plus mr-3 text-blue-500"></i>Sign up
          </h1>
          <form  action="" onSubmit={(e) => handleSubmit(e)}>

          <span className=" relative flex justify-between items-center">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Full Name"
            />
             <i class="fa-solid fa-user absolute top-4 ml-3 text-lg "></i>
            </span>

            <span className=" relative flex justify-between items-center ">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
            />
             <i class="fa-solid fa-envelope absolute top-4 ml-3 text-lg "></i>
            </span>

           <span className=" relative flex justify-between items-center">
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Password"
            />
             <i className="fa-solid fa-key absolute top-4 ml-3 text-lg "></i>
            </span>
            <button 
              type="submit"
              className="active:scale-98 transition-all ease-in-out cursor-pointer w-full text-center py-3 rounded bg-blue-400 text-white hover:bg-green-dark focus:outline-none my-1"
            
            >
            { loading ?<i class="fa-solid fa-spinner animate-spin text-2xl"></i> : "Create Account"}
            </button>
          
          </form>
          

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            to="/signin"
            className="no-underline border-b border-blue text-blue ml-3"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
