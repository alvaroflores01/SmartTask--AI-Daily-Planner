import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
function AddTaskInput() {
  const [task, setTask] = useState("");
  const { id, setTaskList, username } = useContext(UserContext);
  const addTask = async (e) => {
    const fetchTasks = async () => {
      if (username) {
        const { data } = await axios.get("/userTasks");
        setTaskList(data);
        setTask("");
      }
    };
    e.preventDefault();
    await axios.post("/task", { task, id });
    fetchTasks();
  };

  return (
    <form onSubmit={addTask}>
      <div className="flex gap-2 bg-gray-500 w-full rounded-2xl focus:border-gray-400 flex-grow-2">
        <button className="p-2 text-gray-400">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>{" "}
        <input
          type="text"
          placeholder="Add Task"
          className="bg-transparent w-full placeholder:text-gray-400 text-gray-200 p-2 text-xl focus:outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
    </form>
  );
}

export default AddTaskInput;
