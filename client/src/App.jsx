import axios from "axios";
import Routes from "./routes/Routes.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}
export default App;
