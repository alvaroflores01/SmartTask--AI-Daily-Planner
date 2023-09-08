import GeneratedTask from "./GeneratedTask";
const GeneratedSchedule = ({ schedule: plannedTasks }) => {
  return (
    <div className="md:h-[80%] lg:w-1/3 md:p-8 text-white  p-3 border-4 sm:rounded-xl overflow-hidden">
      <h1 className="text-center text-xl italic underline mb-2">
        Today's Plan
      </h1>
      <div className="h-[95%] overflow-auto">
        {plannedTasks.map((plannedTask) => {
          return <GeneratedTask data={plannedTask} />;
        })}
      </div>
      <p className=" h-[5%] text-center italic text-gray-600">
        Your schedule was created with the help of openai!
      </p>
    </div>
  );
};
export default GeneratedSchedule;
