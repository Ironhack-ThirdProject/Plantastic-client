import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
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
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import IsCustomer from "./components/IsCustomer/IsCustomer";
import IsAdmin from "./components/IsAdmin/isAdmin";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/:productId" element={<PlantDetails />} />
        <Route
          path="/cart"
          element={
            <IsPrivate>
              <IsCustomer>
                <CartPage />
              </IsCustomer>
            </IsPrivate>
          }
        />
        <Route
          path="/dashboard"
          element={
            <IsPrivate>
              <IsAdmin>
                <DashboardPage />
              </IsAdmin>
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <IsCustomer>
                <ProfilePage />
              </IsCustomer>
            </IsPrivate>
          }
        />
        <Route
          path="/payment/success"
          element={
            <IsPrivate>
              <IsCustomer>
                <PaymentPage />
              </IsCustomer>
            </IsPrivate>
          }
        />
        <Route
          path="/payment/cancel"
          element={
            <IsPrivate>
              <IsCustomer>
                <PaymentPage />
              </IsCustomer>
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