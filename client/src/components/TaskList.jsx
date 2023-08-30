import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Task from "./Task";

const TaskList = ({ title }) => {
  const { taskList } = useContext(UserContext);
  if (taskList !== null && taskList.length > 0) {
    return (
      <div className="text-white overflow-hidden p-8 flex-grow">
        <h1 className="mb-1">{title}</h1>
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
