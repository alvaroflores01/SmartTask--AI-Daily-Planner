import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import TaskList from "../components/TaskList";
import AddTaskInput from "../components/AddTaskInput";
import LogoutBtn from "../components/LogoutBtn";
import PlannerBtn from "../components/PlannerBtn";
import GeneratedSchedule from "../components/GeneratedSchedule";

const UserDashboard = () => {
  const { username, schedule } = useContext(UserContext);
  return (
    <div className="bg-gray-800 lg:h-screen h-full lg:flex items-center sm:border-4 sm:justify-center sm:gap-6 snap-y snap-mandatory">
      <div className="border-4 lg:w-1/3 md:h-[80%] h-screen flex  sm:rounded-xl ">
        <div className="w-full flex  flex-col  rounded-xl">
          <div className="sm:p-8 p-4">
            <h1 className="sm:text-3xl text-2xl text-white">
              Good Afternoon, {username}.
            </h1>
            <h2 className="sm:text-2xl text-lg text-gray-500">
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
      {schedule ? <GeneratedSchedule schedule={schedule} /> : <></>}
    </div>
  );
};
export default UserDashboard;
