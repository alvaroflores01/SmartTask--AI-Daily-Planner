import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserMenu from "../components/UserMenu";
import Task from "../components/Task";
import TaskList from "../components/TaskList";
import AddTaskInput from "../components/AddTaskInput";
import TitleHeader from "../components/TitleHeader";
import LogoutBtn from "../components/LogoutBtn";
import PlannerBtn from "../components/PlannerBtn";
import axios from "axios";
import GeneratedSchedule from "../components/GeneratedSchedule";

const UserDashboard = () => {
  const { setUsername, setId, schedule } = useContext(UserContext);
  const logoutHandler = () => {
    setUsername(null);
  };
  const { id, username } = useContext(UserContext);
  return (
    <div className="bg-gray-800 lg:h-screen h-full lg:flex items-center sm:border-4 sm:justify-center sm:gap-6">
      <div className="border-4 lg:w-1/3 md:h-[80%] h-screen flex  sm:rounded-xl">
        <div className="w-full flex  flex-col  rounded-xl">
          <div className="p-8">
            <h1 className="text-3xl text-white">Good Afternoon, {username}.</h1>
            <h2 className="text-2xl text-gray-500">
              Be so good no one can ignore you
            </h2>
          </div>
          <TaskList title="Daily Tasks" />
          <div className="md:p-5 p-3">
            <PlannerBtn />
            <AddTaskInput />
          </div>
          <LogoutBtn />
        </div>
      </div>
      {schedule ? (
        <GeneratedSchedule schedule={schedule} />
      ) : (
        console.log("Not set")
      )}
    </div>
  );
};
export default UserDashboard;
