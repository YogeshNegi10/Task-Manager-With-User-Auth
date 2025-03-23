
import React, { useContext, useState } from "react";
import { UserContext } from "../main";



const Profile = () => {

    const {Authenticated} = useContext(UserContext)
  
  const [toggle, settoggle] = useState(true);
  
  const {user} = useContext(UserContext)
  
  const handleToggle = () => {
    settoggle(!toggle);
    console.log(toggle);
  };


  return (
    <div className="bg-white  shadow flex justify-center  border  text-center min-h-screen">
      <div className=" w-1/2 mt-20">
        <div className="px-4 py-5 sm:px-6 ">
          <h1 className=" leading-6 text-center text-3xl font-medium text-gray-900 mb-5">
            Welcome, <span className=" text-blue-700 text-[23px] md:text-4xl mt-4  ">{user.name}</span>
          </h1>
          <p className="mt-1 max-w-2xl text-md text-gray-500 text-sm ">
            This is some information about the You.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <p className="text-sm font-medium text-gray-500">Full name</p>
              <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </p>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <p className="text-sm font-medium text-gray-500">Email address</p>
              <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </p>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <p className="text-sm font-medium text-gray-500">Password</p>
              <p className=" flex justify-center items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2  relative ">
                <input
                  className="text-center outline-0 "
                  type={toggle ? "password" : "text"}
                  value={user.password}
                  readOnly={toggle}
                />
                {toggle ? (
                  <i
                    onMouseDown={handleToggle}
                    className="fa-solid fa-eye-slash cursor-pointer absolute right-0 "
                  ></i>
                ) : (
                  <i
                    onMouseUp={handleToggle}
                    className="fa-solid fa-eye cursor-pointer absolute right-0 "
                  ></i>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
