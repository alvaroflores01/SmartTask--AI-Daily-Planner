import axios from 'axios'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const fetchTasks = async () => {
  const { username, taskList, setTaskList} = useContext(UserContext);
    if (username) {
      const { data } = await axios.get("/userTasks");
      console.log(data.length);
      console.log(taskList.length);
      if (data.length !== taskList.length) {
        setTaskList(data);
      }
    }
  };

  export default fetchTasks;