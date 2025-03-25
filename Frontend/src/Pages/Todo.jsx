import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { server } from "../../utils/api";
import { UserContext } from "../main";


const Todo = () => {
   
  const {loading,setLoading,user} = useContext(UserContext)
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
        `${server}/api/v1/task/newTask`,
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
      setRefresh((prev) => !prev);
      setLoading(false)
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${server}/api/v1/task/fetchTask`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          setTask(res.data.tasks);
        });
    };

    fetchData();
  }, [refresh]);

  const handleUpdate = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.put(
        `${server}/api/v1/task/markTask/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
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
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" flex justify-center  m-5 ">
      <div className="p-6 rounded-lg shadow-lg md:w-1/2">
        <h2 className="font-semibold text-gray-800 mb-4 text-center text-3xl">
          Write A Task...
        </h2>
        <form onSubmit={handleSubmit}>
          <div className=" mb-4 flex flex-col gap-2">
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="Add a new task..."
              class="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          
            <textarea
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Write a Description..."
              class="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
           
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 cursor-pointer active:scale-98 transition-all ease-in-out text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
        <ul className="space-y-2">
          {task?.map((task) => (
            <li key={task._id} className={`${user.iscompleted ? " text-red-400, text-white" : "bg-gray-200"}  p-2 rounded-md`}>
              <div className=" flex justify-between items-center">
                <span className="text-lg">{task.title}</span>
                <div className="flex items-center justify-cente">
                  <input
                    onChange={(e) => handleUpdate(task._id)}
                    className="cursor-pointer w-4 h-4"
                    type="checkbox"
                    name="iscompleted"
                    id=""
                    checked={task.iscompleted}
                  />
                  <i
                    onClick={(e) => handleDelete(task._id)}
                    className="fa-solid fa-xmark text-2xl text-red-600 cursor-pointer ml-3"
                  ></i>
                </div>
              </div>
              <p className=" text-[12px] mt-3">{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
