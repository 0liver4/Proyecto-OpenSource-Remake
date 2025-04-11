import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../css/Layout.css";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { TbMedicineSyrup } from "react-icons/tb";
import { SlDrawer } from "react-icons/sl";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { LuClipboardList } from "react-icons/lu";
import { AiOutlineMedicineBox } from "react-icons/ai";

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
              <div className="container-options">
                 <GoHome  className="icon-option"/>
                Inicio 
              </div>
               
              </NavLink>
            </li>
            <li>
              <NavLink to="/pacientes" className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="container-options">
                <FaRegUser />
                 Pacientes
              </div>
               
              </NavLink>
            </li>
            <li>
              <NavLink to="/farmacos" className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="container-options">
                <TbMedicineSyrup />
                Fármacos
              </div>
             
              </NavLink>
            </li>
            <li>
              <NavLink to="/ubicaciones" className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="container-options">
                <SlDrawer />
                Ubicaciones
              </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/marcas" className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="container-options">
              <MdOutlineHealthAndSafety />
                Marcas
              </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/categorias"className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="container-options">
              <AiOutlineMedicineBox />
                Tipos de fármacos
              </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/medicos" className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="container-options">
              <AiOutlineTeam />
                Médicos
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/registroVisitas" className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="container-options">
              <LuClipboardList />
                Registro de visitas
                </div>
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
