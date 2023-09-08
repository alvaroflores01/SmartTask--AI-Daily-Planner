import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const PlannerBtn = () => {
  const { taskList, setSchedule } = useContext(UserContext);
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
      setSchedule(null); //Clear current, and set loading
      const taskString = tasksToString();
      console.log("Clicked AI Planner");
      const response = await axios.patch(`/planDay`, { taskString });
      setSchedule(response.data);
      console.log("Updated Planner");
    } catch (error) {
      console.log("Could not planday");
      console.log(error.message);
    }
  };
  return (
    <div className=" w-full py-2 justify-end flex items-center">
      <button
        onClick={generateBtnHandler}
        className="font-bold  text-green-200  bg-green-600 p-2 rounded-lg  hover:bg-green-500 hover:text-white"
      >
        AI: Plan my day!
      </button>
    </div>
  );
};
export default PlannerBtn;
