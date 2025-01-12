import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import StartPage from "./Pages/StartPage";
import { Home } from "./Pages/Home";
import ProtectRoute from "./Components/ProtectRoute";
import Logout from "./Pages/Logout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<ProtectRoute element={<Home />} formType="User"/>} />
        <Route path="/home" element={<ProtectRoute element={<Home />} formType="Captain"/>} />
        <Route path="/user/login" element={<Login formType="User" />} />
        <Route path="/captain/login" element={<Login formType="Captain" />} />
        <Route path="/user/signup" element={<Signup formType="User" />} />
        <Route path="/captain/signup" element={<Signup formType="Captain" />} />
        <Route path="/user/logout" element={<ProtectRoute element={<Logout formType="User"/>} />} />
        <Route path="/captain/logout" element={<ProtectRoute element={<Logout formType="Captain"/>} />} />
      </Routes>
    </Router>
  );
}

export default App;
