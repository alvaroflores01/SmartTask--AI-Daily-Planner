import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Task from "./Task";

const TaskList = ({ title }) => {
  //
  const { taskList, username, setTaskList } = useContext(UserContext);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    if (username) {
      const { data } = await axios.get("/userTasks");
      setTaskList(data);
    }
  };

  //
  if (taskList !== null && taskList.length > 0) {
    return (
      <div className="text-white overflow-hidden px-3 flex-grow">
        <h1 className="text-center underline sm:text-2xl text-xl ">{title}</h1>
        <div className="overflow-scroll h-full">
          {taskList.map((task) => {
            return (
              <Task
                key={task._id}
                taskId={task._id}
                task={task.task_text}
                completed={task.completed}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-white overflow-hidden p-8 flex-grow">
        <h1 className="mb-1">{`"${title}" currently has not tasks.`}</h1>
      </div>
    );
  }
};
export default TaskList;
