import '../css/Medicos.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
import EditMedicosForm from "./EditMedicosForm.jsx";
import AddMedicosForm from "./AddMedicosForm.jsx";

import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const Medicos = () => {
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
            const result = await getAllData("medicos");
            const sortedData = result.sort((a, b) => a.id_medico - b.id_medico);
            setData(sortedData);
        } catch (err) {
            setError(err);
            console.error("Error al obtener los datos:", err);
        }
    };

    const handleEachRowByClick = (item) => {
        setCurrentItem(item);
        console.log("Médico seleccionado:", item);
    };

    const Eliminar = async () => {
        if (!currentItem) {
            alert("Debe seleccionar una fila");
            return;
        }

        if (window.confirm("¿Está seguro que desea eliminar este médico?")) {
            const done = await DeletedSup(
                currentItem.id_medico,
                "medicos",
                "id_medico"
            );

            if (done) {
                setData(data.filter(item => item.id_medico !== currentItem.id_medico));
                setCurrentItem(null);
            } else {
                alert("Hubo un error al eliminar el médico");
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
        console.log("Abrir formulario para añadir un nuevo médico");
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
        <div className="MedicosBody">
            <div className="Title">
                <h1 className="Title_Content">Médicos</h1>
            </div>

            <div className="ButtonContainer">
                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} />
                <DeleteButton onClick={Eliminar} />
            </div>

            <div>
                {error && <p style={{ color: "red" }}>Hubo un error: {error.message}</p>}

                <table className="tablaMedicos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Tanda</th>
                            <th>Especialidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => handleEachRowByClick(item)}
                                className={currentItem?.id_medico === item.id_medico ? "selected" : ""}
                            >
                                <td>{item.id_medico}</td>
                                <td>{item.nommedico}</td>
                                <td>{item.cedulamedico}</td>
                                <td>{item.tandalaboral}</td>
                                <td>{item.especialidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditMedicosForm 
                medicos={currentItem}
                onClose={closeModal}
                onSuccess={handleEditSuccess}
                isOpen={isModalOpen}
            />

            <AddMedicosForm
                onClose={closeModal}
                isOpen={isModalAddOpen}
                onSuccess={handleEditSuccess}
            />

        </div>
    );
};

export default Medicos;