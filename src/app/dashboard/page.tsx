"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import TaskCard from "../component/TaskCard";
import AddTaskNote from "../component/AddTaskNote";


const Dashboard = ()=>{
const {data: session} = useSession();
const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);

useEffect(() => {
    if (!session || !session.user) return;
  }, [session]);



  const toggleAddTask = () => {
    setIsAddTaskVisible(prev => !prev);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 h-full">
        <SideBar toggleAddTask={toggleAddTask}/>
      </div>
      <div className="flex flex-col items-start p-4 w-full md:ml-64">
        <Header toggleAddTask={toggleAddTask}/>
        <TaskCard toggleAddTask={toggleAddTask} />
        {isAddTaskVisible && <AddTaskNote isVisible={isAddTaskVisible} onClose={toggleAddTask}  />}
      </div>
    </div>
  );
}
export default Dashboard;   