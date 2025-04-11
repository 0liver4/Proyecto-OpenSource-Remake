import '../css/Paciente.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import Modal from 'react-modal';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
import EditPacientesForm from "./EditPacientesForm.jsx";
import AddPacientesForm from "./AddPacientesForm.jsx";
import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const Pacientes = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getAllData("paciente");
            const sortedData = result.sort((a, b) => a.id_paciente - b.id_paciente);
            setData(sortedData);
        } catch (err) {
            setError(err);
            console.error("Error al obtener los datos:", err);
        }
    };

    const handleEachRowByClick = (item) => {
        setCurrentItem(item);
        console.log("Paciente seleccionado:", item);
    };

    const Eliminar = async () => {
        if (!currentItem) {
            alert("Debe seleccionar una fila");
            return;
        }

        if (window.confirm("¿Está seguro que desea eliminar este paciente?")) {
            const done = await DeletedSup(
                currentItem.id_paciente,
                "paciente",
                "id_paciente"
            );

            if (done) {
                setData(data.filter(item => item.id_paciente !== currentItem.id_paciente));
                setCurrentItem(null);
            } else {
                alert("Hubo un error al eliminar el paciente");
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
        console.log("Abrir formulario para agregar un nuevo paciente"); 
        setIsModalAddOpen(true);
    };

    const handleEditSuccess = () => {
        fetchData(); // Recargar datos después de editar
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalAddOpen(false);
    };

    return (
        <div className="PacientesBody">
            <div className="Title">
                <h1 className="Title_Content">Pacientes</h1>
            </div>

            <div className="ButtonContainer">
                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} /> 
                <DeleteButton onClick={Eliminar} />
            </div>

            <div>
                {error && <p style={{ color: "red" }}>Hubo un error: {error.message}</p>}

                <table className="tablaPacientes">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Carnet</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => handleEachRowByClick(item)}
                                className={currentItem?.id_paciente === item.id_paciente ? "selected" : ""}
                            >
                                <td>{item.id_paciente}</td>
                                <td>{item.nompaciente}</td>
                                <td>{item.cedulapaciente}</td>
                                <td>{item.numcarnet}</td>
                                <td>{item.tipopaciente}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditPacientesForm 
                paciente={currentItem}
                onClose={closeModal}
                onSuccess={handleEditSuccess}
                isOpen={isModalOpen}
            />

            <AddPacientesForm
            onClose={closeModal}
            isOpen={isModalAddOpen}
            onSuccess={handleEditSuccess}
            />

        </div>
    );
};

export default Pacientes;