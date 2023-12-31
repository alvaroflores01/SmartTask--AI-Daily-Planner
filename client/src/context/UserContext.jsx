import { createContext, useState, useEffect } from "react";
// import fetchTasks from "../util/fetchTasks";
import axios from "axios";

//Creates empty context
export const UserContext = createContext({});

//Creates a component to be able to provide context to components
export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [taskList, setTaskList] = useState(null);
  const [schedule, setSchedule] = useState(null);
  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => {
        setId(res.data.userId);
        fetchTasks();
      })
      .catch((e) => {
        console.log(`UserContext Catch:${e}`);
      });
  }, []);

  const fetchTasks = async () => {
    if (username) {
      const { data } = await axios.get("/userTasks");
      if (data.length !== taskList.length) {
        setTaskList(data);
      }
    }
  };
  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        id,
        setId,
        taskList,
        setTaskList,
        schedule,
        setSchedule,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
