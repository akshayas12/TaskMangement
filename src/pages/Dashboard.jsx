import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import TaskList from "../components/TaskList";

function Dashboard() {
    const navigate=useNavigate()
    const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");  
    }
  return (
    <div>
       <Navbar onLogout={handleLogout} />
    <div className="p-6">
      <TaskList />
    </div>
    </div>
  );
}

export default Dashboard;
