import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Layout";
import VistaPaciente from "./ViewPacientes";
import "../css/Home.css";

function Home() {
  return (
    <Router>
      <Sidebar />
      <div className="Body">
        <Routes>
          <Route path="/" /> {/*Aqui va el dashboar principal cuando se creen los componentes del mismo*/}
          <Route path="/pacientes" element={<VistaPaciente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
