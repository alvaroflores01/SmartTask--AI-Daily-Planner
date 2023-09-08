import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const LogoutBtn = () => {
  //useContext variables
  const { setUsername, setId, setSchedule } = useContext(UserContext);
  const logoutHandler = () => {
    //remove token and send back to main screen
    setSchedule(null);
    setUsername(null);
  };
  return (
    <div
      className="justify-center flex gap-2 text-red-500 items-center bg-gray-600 p-3 rounded-lg hover:text-red-600 hover:cursor-pointer"
      onClick={logoutHandler}
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </span>
      <h1 className="font-bold">Sign Out</h1>
    </div>
  );
};
export default LogoutBtn;
