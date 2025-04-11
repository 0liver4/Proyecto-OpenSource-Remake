import '../css/Marcas.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
import EditMarcasForm from "./EditMarcasForm.jsx";
import AddMarcasForm from "./AddMarcasForm.jsx";

import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const Marcas = () => {
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
            const result = await getAllData("marcas");
            const sortedData = result.sort((a, b) => a.id_marcas - b.id_marcas);
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

        if (window.confirm("¿Está seguro que desea eliminar esta marca?")) {
            const done = await DeletedSup(
                currentItem.id_marcas,
                "marcas",
                "id_marcas"
            );

            if (done) {
                setData(data.filter(item => item.id_marcas !== currentItem.id_marcas));
                setCurrentItem(null);
            } else {
                alert("Hubo un error al eliminar la marca");
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
        console.log("Abrir formulario para añadir una nueva marca");
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
        <div className="MarcasBody">
            <div className="Title">
                <h1 className="Title_Content">Marcas</h1>
            </div>

            <div className="ButtonContainer">
                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} />
                <DeleteButton onClick={Eliminar} />
            </div>

            <div>
                {error && <p style={{ color: "red" }}>Hubo un error: {error.message}</p>}

                <table className="tablaMarcas">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Marca</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => handleEachRowByClick(item)}
                                className={currentItem?.id_marcas === item.id_marcas ? "selected" : ""}
                            >
                                <td>{item.id_marcas}</td>
                                <td>{item.nommarcas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditMarcasForm 
                marca={currentItem}
                onClose={closeModal}
                onSuccess={handleEditSuccess}
                isOpen={isModalOpen}
            />

        <AddMarcasForm
            onClose={closeModal}
            isOpen={isModalAddOpen}
            onSuccess={handleEditSuccess}/>

        </div>
    );
};

export default Marcas;