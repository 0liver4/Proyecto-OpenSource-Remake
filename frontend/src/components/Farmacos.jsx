import '../css/Farmacos.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
import EditProductosForm from "./EditProductosForm.jsx";
import AddProductosForm from "./AddProductosForm.jsx";

import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const Farmacos = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroMarca, setFiltroMarca] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getAllData("productos");
            const sortedData = result.sort((a, b) => a.id_producto - b.id_producto);
            setData(sortedData);
        } catch (err) {
            setError(err);
            console.error("Error al obtener los datos:", err);
        }
    };

    const handleEachRowByClick = (item) => {
        setCurrentItem(item);
        console.log("Fármaco seleccionado:", item);
    };

    const Eliminar = async () => {
        if (!currentItem) {
            alert("Debe seleccionar una fila");
            return;
        }

        if (window.confirm("¿Está seguro que desea eliminar este fármaco?")) {
            const done = await DeletedSup(
                currentItem.id_producto,
                "productos",
                "id_producto"
            );

            if (done) {
                setData(data.filter(item => item.id_producto !== currentItem.id_producto));
                setCurrentItem(null);
            } else {
                alert("Hubo un error al eliminar el fármaco");
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
        console.log("Abrir formulario para añadir un nuevo fármaco");
        setIsModalAddOpen(true);
    };

    const handleEditSuccess = () => {
        fetchData(); // Recargar datos después de editar
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalAddOpen(false);
    };

    // Función de validación para que solo acepte números del 1 al 10
    const handleFiltroChange = (e, tipo) => {
        const value = e.target.value;

        if (/^[1-9]$|^10$/.test(value) || value === '') {
            if (tipo === 'categoria') {
                setFiltroCategoria(value);
            } else if (tipo === 'marca') {
                setFiltroMarca(value);
            }
        }
    };

    // Aplicar filtro antes de renderizar
    const productosFiltrados = data.filter((item) => {
        const filtroPorCategoria = filtroCategoria ? item.catproducto == filtroCategoria : true;
        const filtroPorMarca = filtroMarca ? item.marcaproducto == filtroMarca : true;
        return filtroPorCategoria && filtroPorMarca;
    });

    return (
        <div className="FarmacosBody">
            <div className="Title">
                <h1 className="Title_Content">Fármacos</h1>
            </div>

            <div className="ButtonContainer">

                <div className="FiltroContainer">
                    <label>Filtrar por categoría (1-10): </label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={filtroCategoria}
                        onChange={(e) => handleFiltroChange(e, 'categoria')}
                        placeholder="Ej. 1, 2, 3..."
                    />
                </div>

                <div className="FiltroContainer">
                    <label>Filtrar por marca (1-10): </label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={filtroMarca}
                        onChange={(e) => handleFiltroChange(e, 'marca')}
                        placeholder="Ej. 1, 2, 3..."
                    />
                </div>

                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} />
                <DeleteButton onClick={Eliminar} />
            </div>

            <div>
                {error && <p style={{ color: "red" }}>Hubo un error: {error.message}</p>}

                <table className="tablaFarmacos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Descripción</th>
                            <th>Marca</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => handleEachRowByClick(item)}
                                className={currentItem?.id_producto === item.id_producto ? "selected" : ""}
                            >
                                <td>{item.id_producto}</td>
                                <td>{item.nomproducto}</td>
                                <td>{item.catproducto}</td>
                                <td>{item.descproducto}</td>
                                <td>{item.marcaproducto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditProductosForm
                currentItem={currentItem}
                onClose={closeModal}
                onSuccess={handleEditSuccess}
                isOpen={isModalOpen}
            />

            <AddProductosForm
                onClose={closeModal}
                isOpen={isModalAddOpen}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
};

export default Farmacos;
