import '../css/RegistroVisitas.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
// import EditRegistroVisitasForm from "./EditRegistroVisitasForm.jsx";

import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const RegistroVisitas = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getAllData("visitas");
            const sortedData = result.sort((a, b) => a.id_visitas - b.id_visitas);
            setData(sortedData);
        } catch (err) {
            setError(err);
            console.error("Error al obtener los datos: ", err);
        }
    };

    const handleEachRowByClick = (item) => {
        setCurrentItem(item);
        console.log("Registro seleccionado: ", item);
    };

    const Eliminar = async () => {
        if (!currentItem) {
            alert("Debe seleccionar un registro");
            return;
        }

        if (window.confirm("¿Está seguro que desea eliminar este registro?")) {
            const done = await DeletedSup(
                currentItem.id_visitas,
                "visitas",
                "id_visitas"
            );

            if (done) {
                setData(data.filter(item => item.id_visitas !== currentItem.id_visitas));
                setCurrentItem(null);
            } else {
                alert("Hubo un error al eliminar el registro");
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
        console.log("Abrir formulario para añadir un nuevo registro");
    };

    const handleEditSuccess = () => {
        fetchData(); // Recargar datos después de editar
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="RegistroVisitasBody">
            <div className="Title">
                <h1 className="Title_Content">Registro de visitas</h1>
            </div>

            <div className="ButtonContainer">
                <DeleteButton onClick={Eliminar} />
                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} />
            </div>

            <div>
                {error && <p style={{ color: "red" }}>Hubo un error: {error.message}</p>}

                <table className="tablaRegistroVisitas">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Médico encargado</th>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Síntomas</th>
                            <th>Medicamentos usados</th>
                            <th>Recomendaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => handleEachRowByClick(item)}
                                className={currentItem?.id_visitas === item.id_visitas ? "selected" : ""}
                            >
                                <td>{item.id_visitas}</td>
                                <td>{item.medico}</td>
                                <td>{item.paciente}</td>
                                <td>{item.fecha}</td>
                                <td>{item.hora}</td>
                                <td>{item.sintomas}</td>
                                <td>{item.medicamentos}</td>
                                <td>{item.recomendaciones}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <EditPacientesForm 
                paciente={currentItem}
                onClose={closeModal}
                onSuccess={handleEditSuccess}
                isOpen={isModalOpen}
            /> */}
        </div>
    );
};

export default RegistroVisitas;