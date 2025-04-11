import '../css/Ubicaciones.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
import EditUbicacionesForm from "./EditUbicacionesForm.jsx";
import AddUbicacionesForm from "./AddUbicacionesForm.jsx";

import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const Ubicaciones = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const [filtroAlmacen, setFiltroAlmacen] = useState('');
    const [filtroEstante, setFiltroEstante] = useState('');
    const [filtroTramo, setFiltroTramo] = useState('');
    const [filtroCelda, setFiltroCelda] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getAllData("almacenar");
            const sortedData = result.sort((a, b) => a.id_apartado - b.id_apartado);
            setData(sortedData);
        } catch (err) {
            setError(err);
            console.error("Error al obtener los datos: ", err);
        }
    };

    const handleEachRowByClick = (item) => {
        setCurrentItem(item);
        console.log("Ubicación seleccionada: ", item);
    };

    const Eliminar = async () => {
        if (!currentItem) {
            alert("Debe seleccionar una fila");
            return;
        }

        if (window.confirm("¿Está seguro que desea eliminar esta ubicación?")) {
            const done = await DeletedSup(
                currentItem.id_apartado,
                "ubicacion",
                "id_apartado"
            );

            if (done) {
                setData(data.filter(item => item.id_apartado !== currentItem.id_apartado));
                setCurrentItem(null);
            } else {
                alert("Hubo un error al eliminar la ubicación");
            }
        }
    };

    const Editar = () => {
        if (!currentItem) {
            alert("Debe seleccionar una fila para editar");
            return;
        }
        setIsModalOpen(true);
    };

    const Añadir = async () => {
        console.log("Abrir formulario para añadir una nueva ubicación");
        setIsModalAddOpen(true);
    };

    const handleEditSuccess = () => {
        fetchData();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalAddOpen(false);
    };

    const obtenerOpcionesUnicas = (campo) => {
        const valores = data.map((item) => item[campo]);
        return [...new Set(valores)];
    };

    const ubicacionesFiltradas = data.filter((item) => {
        const cumpleAlmacen = filtroAlmacen === '' || item.descalmacenar === filtroAlmacen;
        const cumpleEstante = filtroEstante === '' || item.estante === filtroEstante;
        const cumpleTramo = filtroTramo === '' || item.tramo === filtroTramo;
        const cumpleCelda = filtroCelda === '' || item.celda === filtroCelda;

        return cumpleAlmacen && cumpleEstante && cumpleTramo && cumpleCelda;
    });

    return (
        <div className="UbicacionesBody">
            <div className="Title">
                <h1 className="Title_Content">Ubicaciones</h1>
            </div>

            <div className="ButtonContainer">

                <div className="FiltrosContainer">
                    <div className="FiltroItem">
                        <label>Filtrar por Almacén:</label>
                        <select value={filtroAlmacen} onChange={(e) => setFiltroAlmacen(e.target.value)}>
                            <option value="">Todos</option>
                            {obtenerOpcionesUnicas("descalmacenar").map((op, index) => (
                                <option key={index} value={op}>{op}</option>
                            ))}
                        </select>
                    </div>

                    <div className="FiltroItem">
                        <label>Filtrar por Estante:</label>
                        <select value={filtroEstante} onChange={(e) => setFiltroEstante(e.target.value)}>
                            <option value="">Todos</option>
                            {obtenerOpcionesUnicas("estante").map((op, index) => (
                                <option key={index} value={op}>{op}</option>
                            ))}
                        </select>
                    </div>

                    <div className="FiltroItem">
                        <label>Filtrar por Tramo:</label>
                        <select value={filtroTramo} onChange={(e) => setFiltroTramo(e.target.value)}>
                            <option value="">Todos</option>
                            {obtenerOpcionesUnicas("tramo").map((op, index) => (
                                <option key={index} value={op}>{op}</option>
                            ))}
                        </select>
                    </div>

                    <div className="FiltroItem">
                        <label>Filtrar por Celda:</label>
                        <select value={filtroCelda} onChange={(e) => setFiltroCelda(e.target.value)}>
                            <option value="">Todos</option>
                            {obtenerOpcionesUnicas("celda").map((op, index) => (
                                <option key={index} value={op}>{op}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} />
                <DeleteButton onClick={Eliminar} />
            </div>

            <div>
                {error && <p style={{ color: "red" }}>Hubo un error: {error.message}</p>}

                <table className="tablaUbicaciones">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Almacén</th>
                            <th>Estante</th>
                            <th>Tramo</th>
                            <th>Celda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ubicacionesFiltradas.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => handleEachRowByClick(item)}
                                className={currentItem?.id_apartado === item.id_apartado ? "selected" : ""}
                            >
                                <td>{item.id_apartado}</td>
                                <td>{item.descalmacenar}</td>
                                <td>{item.estante}</td>
                                <td>{item.tramo}</td>
                                <td>{item.celda}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditUbicacionesForm
                almacenar={currentItem}
                onClose={closeModal}
                onSuccess={handleEditSuccess}
                isOpen={isModalOpen}
            />

            <AddUbicacionesForm
                onClose={closeModal}
                isOpen={isModalAddOpen}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
};

export default Ubicaciones;
