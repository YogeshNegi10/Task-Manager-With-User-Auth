import { Toaster } from "react-hot-toast";
import "./App.css";
import Footer from "./components/Footer";
import Navbaar from "./components/Navbaar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Todo from "./Pages/Todo";
import { BrowserRouter, Routes, Route } from "react-router";
import { useContext, useEffect } from "react";
import { UserContext } from "./main";
import axios from "axios";
import { server } from "../utils/api";
import ErrorPage from "./Pages/ErrorPage";

function App() {

  const {setUser,Authenticated,setAuthenticated} = useContext(UserContext)

    useEffect( ()=>{

      const fetchData = () =>{
        axios.get(`${server}/api/v1/user/mydetails`,
          {
            headers:{
              "Content-Type":'application/json'
            },
            withCredentials:true
        
        }).then((res)=>{
            setUser(res.data.user)
            setAuthenticated(true)
        }).catch((Error)=>{
          console.log(Error)
          setAuthenticated(false)
      
        })
        
      }
      fetchData()
    },[Authenticated])
    

  return (
    <>
      <BrowserRouter>
        <Navbaar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
