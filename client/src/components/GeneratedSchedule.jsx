import GeneratedTask from "./GeneratedTask";
const GeneratedSchedule = () => {
  const plannedTasks = [
    {
      task: "clean room",
      start_time: "8:00 AM",
      end_time: "9:00 AM",
      tips: [
        "Play some motivating music to make the cleaning more enjoyable.",
        "Break down the cleaning into smaller tasks to stay organized.",
      ],
    },
    {
      task: "do math hw",
      start_time: "9:30 AM",
      end_time: "11:00 AM",
      tips: [
        "Find a quiet place to focus on your math homework.",
        "Gather all necessary materials before starting.",
      ],
    },
    {
      task: "pick up mom",
      start_time: "2:50 PM",
      end_time: "3:10 PM",
      tips: [
        "Leave a few minutes early to account for traffic.",
        "Check the route beforehand to ensure the fastest drive.",
      ],
    },
    {
      task: "make coffee",
      start_time: "3:30 PM",
      end_time: "3:45 PM",
      tips: [
        "Grind fresh coffee beans for the best flavor.",
        "Experiment with different brewing techniques to find your favorite.",
      ],
    },
    {
      task: "buy groceries",
      start_time: "4:00 PM",
      end_time: "5:00 PM",
      tips: [
        "Create a grocery list beforehand to avoid forgetting anything.",
        "Consider using reusable shopping bags to reduce waste.",
      ],
    },
  ];

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
