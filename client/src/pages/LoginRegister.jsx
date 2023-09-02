import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import TitleHeader from "../components/TitleHeader";
const LoginRegister = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  //loadRegisterView if true load registration, else load sign in
  const [loadRegister, setLoadRegister] = useState(false);

  //useContext variables
  const { setUsername, setId } = useContext(UserContext);

  //Register Login Handler (form butn)
  const loginRegisterHandler = async (e) => {
    e.preventDefault();
    const loginRegisterRoute = loadRegister ? "register" : "login";
    //Creates Account
    //Called when registration form is submitted
    //The api will respond with a cookie containing the token.
    const { data } = await axios.post(loginRegisterRoute, {
      usernameInput,
      passwordInput,
    });
    //updates our UserContext
    setUsername(data.username);
    setId(data.id);
  };
  //click toggles between registration and login
  const handleClick = (e) => {
    e.preventDefault();
    setLoadRegister(!loadRegister);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 border-4 ">
      <TitleHeader />
      <div className="flex flex-col justify-center h-screen ">
        <form
          action="#"
          className="w-80 mx-auto mb-12"
          onSubmit={loginRegisterHandler}
        >
          <h1 className="mx-auto mb-4 text-3xl font-bold block text-white tracking-wider">
            {loadRegister ? "Register" : "Sign In"}
          </h1>
          <input
            type="text"
            placeholder="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="block w-full rounded-sm p-2 mb-2 border"
          />
          <input
            type="password"
            placeholder="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="block w-full rounded-sm p-2 mb-2 border"
          />
          <button className="block w-full bg-blue-600 p-2 rounded-sm text-white font-bold hover:text-blue-900 border">
            {loadRegister ? "Create Account" : "Log In"}
          </button>
          <div className="text-center mt-2 text-white">
            {loadRegister ? "Already a member? " : "Not a member? "}
            <a
              onClick={handleClick}
              className="font-bold underline hover:cursor-pointer"
            >
              {loadRegister ? "Log In" : "Create Account"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
