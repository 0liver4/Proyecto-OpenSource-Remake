import '../css/Categorias.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
// import EditTipoFarmacosForm from "./EditTipoFarmacosForm.jsx";

import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const Categorias = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getAllData("categorias");
            const sortedData = result.sort((a, b) => a.id_categoria - b.id_categoria);
            setData(sortedData);
        } catch (err) {
            setError(err);
            console.error("Error al obtener los datos:", err);
        }
    };

    const handleEachRowByClick = (item) => {
        setCurrentItem(item);
        console.log("Tipo de fármaco seleccionado:", item);
    };

    const Eliminar = async () => {
        if (!currentItem) {
            alert("Debe seleccionar una fila");
            return;
        }

        if (window.confirm("¿Está seguro que desea eliminar este tipo de fármaco?")) {
            const done = await DeletedSup(
                currentItem.id_categoria,
                "categorias",
                "id_categoria"
            );

            if (done) {
                setData(data.filter(item => item.id_categoria !== currentItem.id_categoria));
                setCurrentItem(null);
            } else {
                alert("Hubo un error al eliminar el tipo de fármaco");
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
        console.log("Abrir formulario para añadir un nuevo tipo de fármaco");
    };

    const handleEditSuccess = () => {
        fetchData(); // Recargar datos después de editar
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="TipoFarmacosBody">
            <div className="Title">
                <h1 className="Title_Content">Tipos de fármacos</h1>
            </div>

            <div className="ButtonContainer">
                <DeleteButton onClick={Eliminar} />
                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} />
            </div>

            <div>
                {error && <p style={{ color: "red" }}>Hubo un error: {error.message}</p>}

                <table className="tablaTipoFarmacos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => handleEachRowByClick(item)}
                                className={currentItem?.id_categoria === item.id_categoria ? "selected" : ""}
                            >
                                <td>{item.id_categoria}</td>
                                <td>{item.nomcategoria}</td>
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

export default Categorias;