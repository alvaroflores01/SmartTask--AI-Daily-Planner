import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import TitleHeader from "../components/TitleHeader";
import DemoUserBtn from "../components/DemoUserBtn";
import UserAlertWarning from "../components/UserAlertWarning";
const LoginRegister = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  //loadRegisterView if true load registration, else load sign in
  const [loadRegister, setLoadRegister] = useState(false);

  //useContext variables
  const { setUsername, setId } = useContext(UserContext);

  //Register Login Handler (form butn)
  const loginRegisterHandler = async (e) => {
    e.preventDefault();
    const loginRegisterRoute = loadRegister ? "register" : "login";
    try {
      const { data } = await axios.post(loginRegisterRoute, {
        usernameInput,
        passwordInput,
      });
      setUsername(data.username);
      setId(data.id);
    } catch (error) {
      setLoginError(error.response.data);
    }
  };
  const loginDemo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("login", {
        usernameInput: "John Doe",
        passwordInput: "demo",
      });
      setUsername(data.username);
      setId(data.id);
    } catch (error) {
      setLoginError(error.response.data);
    }
  };
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
            required
          />
          <input
            type="password"
            placeholder="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="block w-full rounded-sm p-2 mb-2 border"
            required
          />
          <button className="block w-full bg-blue-600 p-2 rounded-sm text-white font-bold hover:text-blue-900 border">
            {loadRegister ? "Create Account" : "Log In"}
          </button>
          {loginError ? <UserAlertWarning msg={loginError} /> : <></>}
          <div className="text-center mt-2 text-white">
            {loadRegister ? "Already a member? " : "Not a member? "}
            <a
              onClick={handleClick}
              className="font-bold underline hover:cursor-pointer"
            >
              {loadRegister ? "Log In" : "Create Account"}
            </a>
          </div>
          <div onClick={loginDemo}>
            <DemoUserBtn />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
