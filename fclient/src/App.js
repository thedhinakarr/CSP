import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import PlayerPage from "./Components/PlayerPage";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
     
      <Route element={<PrivateRoute />}>
        <Route path="/player" element={<PlayerPage />} />
      </Route>

    </Routes>

  );
}

export default App;
