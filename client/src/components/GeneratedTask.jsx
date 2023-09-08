const GeneratedTask = ({ data }) => {
  return (
    <div className="sm:flex flex-col sm:px-10">
      <h2 className="font-extrabold self-end">{`${data.start_time} - ${data.end_time}`}</h2>
      <h2 className="font-bold">{`${data.task.toUpperCase()}`}</h2>
      <ul className="list-none italic text-gray-300 sm:p-3">
        <p>Tips:</p>
        <li>
          <p>{`${data.tips[0]}`}</p>
        </li>
        <li>
          <p>{`${data.tips[1]}`}</p>
        </li>
      </ul>
      <hr className="w-[100%] mx-auto my-3" />
    </div>
  );
};

export default GeneratedTask;
