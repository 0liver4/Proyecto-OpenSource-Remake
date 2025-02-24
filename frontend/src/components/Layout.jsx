import Logo from "../assets/Logo.png";
import "../css/Layout.css";

function Sidebar() {
  return (
    <div className="Layout">
      <div className="Sidebar-body">
        <div className="Logo">
          <img src={Logo} alt="Logo"></img>
        </div>
        <div className="Navbar-Items">
          <ul>
            <li>
              <a href="">Inicio</a>
            </li>
            <li>
              <a href="">Pacientes</a>
            </li>
            <li>
              <a href="">Farmacos</a>
            </li>
            <li>
              <a href="">Ubicaciones</a>
            </li>
            <li>
              <a href="">Marcas</a>
            </li>
            <li>
              <a href="">Tipos de Farmacos</a>
            </li>
            <li>
              <a href="">Medicos</a>
            </li>
            <li>
              <a href="">Registro de visitas</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="Navbar">
        <div className="Title">
          <h1>Dispensario Medico UNAPEC</h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
