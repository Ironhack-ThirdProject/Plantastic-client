import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import { PlantList } from "./pages/PlantsList/PlantList";
import PlantDetails from "./components/PlantDetails/PlantDetails";
import OrderPage from "./pages/OrderPage/OrderPage";
import PlantsEditPage from "./components/PlantEdit/PlantEdit";
import DashboardPage from "./pages/DashboardPage/DashboardPage";


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/:plantId" element={<PlantDetails />} />
        <Route path="/order" element={<IsPrivate><OrderPage /></IsPrivate>}/>
        <Route path="/dashboard" element={<IsPrivate><DashboardPage/></IsPrivate>} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
