// import logo from './logo.svg';
import "./App.css";
import SendOtp from "./component/sendOtp";
import Profile from "./component/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SendOtp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
