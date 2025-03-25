import React, { useContext, useState } from "react";
import { UserContext } from "../main";
import { server } from "../../utils/api";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const { user, setRefresh } = useContext(UserContext);

  const [toggle, setToggle] = useState(true);
  const [popup, setPopup] = useState(false);

  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
  });


  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVerification = async () => {
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/verify-email`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setPopup(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setRefresh(false);
      setPopup(false);
    }
  };

  const handleVerified = async (e) => {
    e.preventDefault();
    const OneTimePassword =
      otp.digitOne + otp.digitTwo + otp.digitThree + otp.digitFour;

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/verify-Otp`,
        {
          OneTimePassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh(true);
      setPopup(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setRefresh(false);
    }
  };

  return popup ? (
    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div class="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {user.email}</p>
            </div>
          </div>

          <div>
            <form action="" method="post" onSubmit={(e) => handleVerified(e)}>
              <div class="flex flex-col space-y-16">
                <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div class="w-14 h-14">
                    <input
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="digitOne"
                      id=""
                      onChange={handleChange}
                    />
                  </div>
                  <div class="w-14 h-14 ">
                    <input
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="digitTwo"
                      id=""
                      onChange={handleChange}
                    />
                  </div>
                  <div class="w-14 h-14 ">
                    <input
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="digitThree"
                      id=""
                      onChange={handleChange}
                    />
                  </div>
                  <div class="w-14 h-14 ">
                    <input
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name="digitFour"
                      id=""
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={handleVerified}
                      class=" cursor-pointer flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      class="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white  shadow flex justify-center  border  text-center min-h-screen">
      <div className=" w-1/2 mt-20">
        <div className="px-4 py-5 sm:px-6 ">
          <h1 className=" leading-6 text-center text-3xl font-medium text-gray-900 mb-5">
            Welcome,{" "}
            <span className=" text-blue-700 text-[23px] md:text-4xl mt-4  ">
              {user.name}
            </span>
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
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative ">
              <p className="text-sm font-medium text-gray-500">Email address</p>

              <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2  ">
                {user.email}
                {user.emailVerified ? (
                  <span className=" absolute  text-[10px]  cursor-pointer text-blue-600 font-bold right-[-30px] top-0 bottom-3  md:top-4 md:right-14">
                    Verified Email
                  </span>
                ) : (
                  <span
                    onClick={handleVerification}
                    className=" animate-bounce text-[10px] absolute right-[-30px] top-0 bottom-3  md:top-4 md:right-14 cursor-pointer text-red-600 font-bold    " 
                  >
                    Verify Email
                  </span>
                )}
              </p>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <p className="text-sm font-medium text-gray-500">Password</p>
              <p className="flex justify-center items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2  relative ">
                <input
                  className="text-center outline-0 "
                  type={toggle ? "password" : "text"}
                  value={user.password}
                  readOnly={toggle}
                />
                {toggle ? (
                  <i
                    onClick={handleToggle}
                    className="fa-solid fa-eye-slash cursor-pointer absolute right-0 "
                  ></i>
                ) : (
                  <i
                    onClick={handleToggle}
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
