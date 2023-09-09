import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const PlannerBtn = () => {
  const { taskList, setSchedule } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const generateBtnHandler = async () => {
    function tasksToString() {
      let taskString = "";
      for (let i = 0; i < taskList.length; i++) {
        const obj = taskList[i];
        if (i === 0) {
          taskString += obj.task_text;
        } else {
          taskString += ", " + obj.task_text;
        }
      }
      return taskString;
    }
    try {
      setSchedule(null);
      const taskString = tasksToString();
      if (taskString == "") throw { message: "No tasks!" };
      setLoading(true);
      const response = await axios.patch(`/planDay`, { taskString });
      setSchedule(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const animate = loading
    ? "animate-pulse bg-gray-400 text-white "
    : "bg-green-600 hover:bg-green-500  text-green-200";
  return (
    <div className=" w-full py-2 justify-end flex items-center">
      <button
        onClick={generateBtnHandler}
        className={`font-bold    p-2 rounded-lg   hover:text-white ${animate}`}
      >
        {loading ? "Loading..." : "AI: Plan my day!"}
      </button>
    </div>
  );
};
export default PlannerBtn;
