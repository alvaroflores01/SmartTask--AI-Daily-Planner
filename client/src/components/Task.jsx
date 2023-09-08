import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Task = ({ task = "default-task", completed, taskId }) => {
  // const { username, taskList, setTaskList } = useContext(UserContext);
  // const fetchTasks = async () => {
  //   if (username) {
  //     const { data } = await axios.get("/userTasks");
  //     if (data.length !== taskList.length) {
  //       setTaskList(data);
  //     }
  //   }
  // };
  const deleteHandler = () => {
    try {
      axios.delete(`/task/${taskId}`);
    } catch (error) {
      console.log("Could not delete task");
      console.log(error.message);
    }
  };
  const completedHandler = async () => {
    try {
      await axios.put(`/task/${taskId}`, { completed: !completed });
      // fetchTasks();
      // console.log(`Completed is now ${completed}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-gray-500 p-2 flex justify-between m-4 items-center rounded-lg">
      <h1
        className={completed ? "line-through text-gray-600 block w-full" : ""}
      >
        {task}
      </h1>
      <div className="flex gap-2">
        <button
          onClick={completedHandler}
          className="bg-green-500 p-1 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button onClick={deleteHandler} className="bg-red-500 p-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Task;
