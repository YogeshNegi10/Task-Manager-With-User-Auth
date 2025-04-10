import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../main";
import axios from "axios";
import { server } from "../../utils/api";
import toast from "react-hot-toast";
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Navbaar = () => {
  const navigate = useNavigate();
  const { Authenticated, setAuthenticated,user,loading } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setAuthenticated(true);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="text-md md:text-2xl font-bold text-blue-600">
        <Link to="/"><i class="fa-solid fa-book"></i> Task Manager</Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-500 text-2xl" : ""
              } text-2xl hover:text-blue-500`
            }
          >
            <i class="fa-solid fa-house" data-tooltip-id="home"
              data-tooltip-content="Home" ></i>
              <ReactTooltip  style={{fontSize:12 }} id="home"/>
          </NavLink>
        </li>

        {Authenticated ? (
          <li>
            <NavLink
              to="/todo"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500 text-2xl" : ""
                } text-2xl hover:text-blue-500 `
              }
            >
              <i class="fa-solid fa-list-check" data-tooltip-id="Tasks"
              data-tooltip-content="Tasks"></i>
              <ReactTooltip  style={{fontSize:12}} id="Tasks"/>
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {Authenticated ? (
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500 text-2xl" : ""
                } text-2xl hover:text-blue-500 `
              }
            >
              <i class="fa-solid fa-circle-user relative" data-tooltip-id="profile"
              data-tooltip-content="Profile" ></i>
              <ReactTooltip  style={{fontSize:12 }} id="profile"/>
             {user?.emailVerified ? "" : <i class="fa-solid fa-star text-red-500 text-[10px] absolute"></i>}
            </NavLink>
          </li>
        ) : (
          ""
        )}
      </ul>

      {/* Login & Signup */}

      <div className="flex space-x-4">
        {Authenticated ? (
          <button
            onClick={handleLogout}
            className=" hover:underline cursor-pointer hover:text-blue-500 "
          >
            <i class="fa-solid fa-right-from-bracket text-lg"  data-tooltip-id="logout"
              data-tooltip-content="Logout!" ></i>
              <ReactTooltip  style={{fontSize:12 }} id="logout"/>
          </button>
        ) : (
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-500" : ""
              } hover:underline cursor-pointer"} hover:text-blue-500 `
            }
          >
            <i class="fa-solid fa-key "data-tooltip-id="login"
              data-tooltip-content="Login!"></i>
              <ReactTooltip  style={{fontSize:12 }} id="login" place="left" />
            
          </NavLink>
        )}

        {Authenticated ? (
          ""
        ) : (
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-500" : ""
              } hover:underline cursor-pointer"} hover:text-blue-500 `
            }
          >
            { loading ? "" :<i class="fa-solid fa-user-plus text-lg" data-tooltip-id="signUp"
              data-tooltip-content="SignUp!"> </i> }
               <ReactTooltip  style={{fontSize:12 }} id="signUp" /> 
              
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbaar;
