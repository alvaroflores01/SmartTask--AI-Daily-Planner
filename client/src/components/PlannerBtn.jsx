import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const PlannerBtn = () => {
  const { taskList } = useContext(UserContext);
  return (
    <div className=" w-full py-2 justify-end flex items-center">
      <button className="font-bold  text-green-200  bg-green-600 p-2 rounded-lg  hover:bg-green-500 hover:text-white">
        AI: Plan my day!
      </button>
    </div>
  );
};
export default PlannerBtn;
