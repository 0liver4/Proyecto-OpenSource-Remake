import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Layout";
import PacientesView from "./PacientesView";
import LoginView from "./LoginView";
import "../css/Home.css";

function Home() {
  return (
    <Router>
      <Sidebar />
      <div className="Body">
        <Routes>
          <Route path="/" element={<LoginView />} />  {/*Aqui va el dashboar principal cuando se creen los componentes del mismo*/}
          <Route path="/pacientes" element={<PacientesView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
