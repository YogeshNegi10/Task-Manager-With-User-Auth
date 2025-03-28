import React, { useContext, useEffect, useState } from "react";
import { server } from "../../utils/api";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../main";




const Bin = ({setRefresh,refreshBin,setRefreshBin}) => {
  const {loading, setLoading } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState([]);


  // Handling the deletion of a single task from the bin

  const handleDelete = async (id) => {
    setLoading(true);
   try {
     const { data } = await axios.delete(
       `${server}/api/v1/task/deleteTask/${id}`,
       {
         headers: {
           "Content-Type": "application/json",
         },
         withCredentials: true,
       }
     );

     toast.success(data.message);
     setRefreshBin((prev) => !prev);
    
      if (task.length === 1) {
        setModal(false);
      }  
      setLoading(false)

   } catch (error) {
     console.log(error);
     toast.error(error.response.data.message);
   }
 };

 // Handling the restoration of a single task from the bin

  const  handleRestore = async (id) => {

   try {
     const { data } = await axios.post(
       `${server}/api/v1/task/restore/${id}`,
       {
         headers: {
           "Content-Type": "application/json",
         },
         withCredentials: true,
       }
     );

     toast.success(data.message);
     setRefreshBin((prev) => !prev);
     setRefresh((prev) => !prev); 
      if (task.length === 1) {
        setModal(false);
      }  

   } catch (error) {
     console.log(error);
     toast.error(error.response.data.message);
   }
 };

  // Fetching the tasks from the bin

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        const { data } = await axios.get(`${server}/api/v1/task/getBin`, {
          withCredentials: true,
        });
         setTask(data.tasks);    
      } catch (error) {
        console.log(error);
      }
    };
   
    fetchData();
  }, [refreshBin]);

  // Handling the deletion of all tasks from the bin

 const handleDeleteAll = async () => {
      setLoading(true);
    try {
      const { data } = await axios.delete(`${server}/api/v1/task/deleteAll`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      toast.success(data.message);
      setRefreshBin((prev) => !prev);
      setRefresh((prev) => !prev);
      setLoading(false);
      if (task.length) {
         setModal(false);
       }  
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


// Handling the modal visibility

  const handleModalClick = () => {
    setModal(!modal);
  };

  return (
    // Rendering the bin component
    <div>
   {task?.length > 0 ? <div className="flex animate-bounce justify-center items-center absolute left-7 top-19 px-2 bg-amber-200 shadow-2xl rounded-full">{task.length}</div> : "" }
      {task?.length > 0 ? (
         
        <i
          onClick={handleModalClick}
          class=" fa-solid fa-recycle text-2xl absolute left-2 mt-2 cursor-pointer"
        ></i>
       
      ) : (
        ""
      )}
      <div
        className={`${
          modal ? " transform translate-x-[100]" : ""
        } transition-all ease-in-out 0.5s   transform translate-x-[-100%] z-10 absolute left-0 top-16 h-screen bg-blue-100 w-screen md:w-1/2 px-3 shadow-lg `}
      >
        <div className=" flex justify-end">
          <i
            onClick={handleModalClick}
            class="fa-solid fa-xmark text-2xl text-right mt-2 cursor-pointer  "
          ></i>
        </div>
        <h1 className=" mb-4 text-md ">
          Deleted Items List{" "}
          <i class="fa-solid fa-trash text-sm text-right ml-2 cursor-pointer  "></i>{" "}
        </h1>
        <ul className="space-y-2">
          {task?.map((task) => (
            <li
              key={task._id}
              className={`${
                task.iscompleted == "completed" ? "bg-green-500 text-white" : ""
              } bg-gray-300 p-2 rounded-md`}
            >
              <div className=" flex justify-between items-center">
                <span className="text-lg">{task.title}</span>
                <div className="flex text-sm items-center justify-cente">
                <i
                   onClick={(e) => handleRestore(task._id)}
                    className="fa-solid fa-rotate-left text-lg cursor-pointer mr-3"
                  ></i>
                  <select defaultValue={task.iscompleted}  className="  cursor-pointer w-full outline-0 p-1 text-sm  rounded-md bg-white text-gray-700">
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <i
                    onClick={(e) => handleDelete(task._id)}
                    className="fa-solid fa-xmark text-2xl text-red-600 cursor-pointer ml-3"
                  ></i>
                </div>
              </div>
              <div className=" flex justify-between items-center mt-3 ">
                    <p className=" text-[12px] ">{task.description}</p>
                    <span
                      className={`${
                        task.iscompleted == "completed" ? " line-through" : ""
                      } text-[12px]`}
                    >
                      Due Date :{new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
            </li>
          ))}
        </ul>
        {task.length > 1 ? (
          <div className=" text-right mt-3">
            <button
              onClick={handleDeleteAll}
              className=" rounded-sm cursor-pointer px-4 py-2 bg-blue-600 text-sm hover:bg-blue-700 transition-all ease-in-out text-white border-0"
            >
               { loading ?<i class="fa-solid fa-spinner animate-spin text-2xl"></i> : "Delete All"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Bin;
