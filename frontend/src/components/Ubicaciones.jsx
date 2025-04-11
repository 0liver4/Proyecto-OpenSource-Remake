import '../css/Ubicaciones.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
// import EditUbicacionesForm from "./EditUbicacionesForm.jsx";

import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const Ubicaciones = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    };

    const handleEditSuccess = () => {
        fetchData(); // Recargar datos después de editar
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="UbicacionesBody">
            <div className="Title">
                <h1 className="Title_Content">Ubicaciones</h1>
            </div>

            <div className="ButtonContainer">
                <DeleteButton onClick={Eliminar} />
                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} />
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
                        {data.map((item, index) => (
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

            {/* <EditFarmacosForm 
                farmaco={currentItem}
                onClose={closeModal}
                onSuccess={handleEditSuccess}
                isOpen={isModalOpen}
            /> */}
        </div>
    );
};

export default Ubicaciones;