import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../css/Layout.css";

function Sidebar() {
  return (
    <div className="Layout">
      <div className="Sidebar-body">
        <div className="Logo">
          <NavLink to="/">
            <img src={Logo} alt="Logo" />
          </NavLink>
        </div>
        <div className="Navbar-Items">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}> 
                Inicio 
              </NavLink>
            </li>
            <li>
              <NavLink to="/pacientes" className={({ isActive }) => (isActive ? "active" : "")}>
                Pacientes
              </NavLink>
            </li>
            <li>
              <NavLink to="/farmacos" className={({ isActive }) => (isActive ? "active" : "")}>
                Fármacos
              </NavLink>
            </li>
            <li>
              <NavLink to="/ubicaciones" className={({ isActive }) => (isActive ? "active" : "")}>
                Ubicaciones
              </NavLink>
            </li>
            <li>
              <NavLink to="/marcas" className={({ isActive }) => (isActive ? "active" : "")}>
                Marcas
              </NavLink>
            </li>
            <li>
              <NavLink to="/tipos-farmacos"className={({ isActive }) => (isActive ? "active" : "")}>
                Tipos de Fármacos
              </NavLink>
            </li>
            <li>
              <NavLink to="/medicos" className={({ isActive }) => (isActive ? "active" : "")}>
                Médicos
              </NavLink>
            </li>
            <li>
              <NavLink to="/registro-visitas" className={({ isActive }) => (isActive ? "active" : "")}>
                Registro de visitas
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="Navbar">
        <div className="Title">
          <h1>Dispensario Médico UNAPEC</h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
