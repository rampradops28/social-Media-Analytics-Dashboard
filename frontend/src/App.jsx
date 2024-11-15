import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Report from './components/Report';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Youtube from './components/Youtube';
import Ytanalysis from './components/Ytanalysis';
import AllAnalysis from './components/Allanalysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/youtube" element={<Youtube/>} />
        <Route path="/Allanalysis" element={<AllAnalysis/>} />
        <Route path="/Ytanalysis/:videoId" element={<Ytanalysis/>} />

        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
