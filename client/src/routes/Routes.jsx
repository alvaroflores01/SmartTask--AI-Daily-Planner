import LoginRegister from "../pages/LoginRegister";
import UserDashBoard from "../pages/UserDashboard";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Routes = () => {
  //Grab values provided by UserContext to be used
  const { username, id } = useContext(UserContext);
  if (username) {
    return <UserDashBoard />;
  }
  return <LoginRegister />;
};
export default Routes;
