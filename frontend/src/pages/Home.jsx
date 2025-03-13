import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Layout";
import PacientesView from "./PacientesView";
import FarmacosView from "./FarmacosView";
import UbicacionesView from "./UbicacionesView";
import MarcasView from "./MarcasView";
import CategoriasView from "./CategoriasView";
import MedicosView from "./MedicosView";
import RegistroVisitasView from "./RegistroVisitasView";

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
          <Route path="/farmacos" element={<FarmacosView />} />
          <Route path="/ubicaciones" element={<UbicacionesView />} />
          <Route path="/marcas" element={<MarcasView />} />
          <Route path="/categorias" element={<CategoriasView />} />
          <Route path="/medicos" element={<MedicosView />} />
          <Route path="/registroVisitas" element={<RegistroVisitasView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
