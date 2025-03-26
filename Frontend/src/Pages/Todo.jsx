import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { server } from "../../utils/api";
import { UserContext } from "../main";

const Todo = () => {
  const { loading, setLoading } = useContext(UserContext);
  const [task, setTask] = useState([]);
  const [creating, setCreating] = useState(false);

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
    setCreating(true);
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
      setCreating(false);
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      setCreating(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      try {
        await axios
          .get(`${server}/api/v1/task/fetchTask`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
          .then((res) => {
            setTask(res.data.tasks);
          });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };

    fetchData();
  }, [refresh]);

  const markTheTask = async (id) => {
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

  const handleDeleteAll = async () => {
    try {
      const { data } = await axios.delete(`${server}/api/v1/task/deleteAll`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

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
        {/* <form onSubmit={handleSubmit}> */}
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
            onClick={handleSubmit}
            type="submit"
            disabled={creating}
            className="bg-blue-500 cursor-pointer active:scale-98 transition-all ease-in-out text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            {creating ?  <i class="fa-solid fa-spinner animate-spin text-2xl"></i> : "Add Task"} 
          </button>
        </div>
        {/* </form> */}
       { loading ? <i class="fa-solid fa-spinner animate-spin text-2xl"></i> : task.length < 1 ? <h1 className=" text-sm">No Tasks Yet!</h1>: <ul className="space-y-2">
          {task?.map((task) => (
            <li
              key={task._id}
              className={`${
                task.iscompleted ? "  bg-green-500 text-white" : ""
              } bg-gray-300 p-2 rounded-md`}
            >
              <div className=" flex justify-between items-center">
                <span className="text-lg">{task.title}</span>
                <div className="flex items-center justify-cente">
                  <input
                    onChange={(e) => markTheTask(task._id)}
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
       }

        {task.length > 1 ? (
          <div className=" text-right mt-3">
            <button
              onClick={handleDeleteAll}
              className=" rounded-sm cursor-pointer px-4 py-2 bg-blue-600 text-sm hover:bg-blue-700 transition-all ease-in-out text-white border-0"
            >
              Delete All
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Todo;
