import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const PlannerBtn = () => {
  const { taskList } = useContext(UserContext);
  return <button className="p-2 border">Click me</button>;
};
export default PlannerBtn;
