import axios from "axios";
import Routes from "./routes/Routes.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
function App() {
  axios.defaults.baseURL =
    "https://smart-task-server-fa506952c9e9.herokuapp.com";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}
export default App;
