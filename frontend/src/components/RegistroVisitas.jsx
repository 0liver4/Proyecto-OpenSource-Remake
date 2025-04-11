import '../css/RegistroVisitas.css';
import '../css/Buttons.css';
import '../css/Modal.css';
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx";
import EditButton from "./EditButton.jsx";
import EditRegistroVisitasForm from "./EditRegistroVisitasForm.jsx";
import AddVisitasForm from "./AddVisitasForm.jsx";

import React, { useEffect, useState } from "react";
import getAllData from "../../../Backend/controllers/Get.js";
import DeletedSup from "../../../Backend/controllers/DeletedSup.js";

const RegistroVisitas = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const [filtroMedico, setFiltroMedico] = useState("");
    const [filtroPaciente, setFiltroPaciente] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");

    const [medicosUnicos, setMedicosUnicos] = useState([]);
    const [pacientesUnicos, setPacientesUnicos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getAllData("visitas");
            console.log("Datos cargados:", result);
            const sortedData = result.sort((a, b) => a.id_visitas - b.id_visitas);
            setData(sortedData);
            setFilteredData(sortedData);

            const medicos = [...new Set(sortedData.map(item => item.medico))];
            const pacientes = [...new Set(sortedData.map(item => item.paciente))];
            setMedicosUnicos(medicos);
            setPacientesUnicos(pacientes);
        } catch (err) {
            setError(err);
            console.error("Error al obtener los datos: ", err);
        }
    };

    const aplicarFiltros = () => {
        console.log("Aplicando filtros...");

        // Revisar valores de los filtros
        console.log("Filtro médico:", filtroMedico);
        console.log("Filtro paciente:", filtroPaciente);
        console.log("Filtro fecha:", filtroFecha);

        const filtrados = data.filter(item => {
            const fechaItem = item.fecha; // 'YYYY-MM-DD' format
            const fechaInput = filtroFecha ? new Date(filtroFecha).toISOString().split('T')[0] : ""; // 'YYYY-MM-DD'

            return (
                (!filtroMedico || item.medico === parseInt(filtroMedico)) &&
                (!filtroPaciente || item.paciente === parseInt(filtroPaciente)) &&
                (!filtroFecha || fechaItem === fechaInput)
            );
        });

        console.log("Resultado filtrado:", filtrados);
        setFilteredData(filtrados);
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
                setFilteredData(filteredData.filter(item => item.id_visitas !== currentItem.id_visitas));
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

    const Añadir = () => {
        setIsModalAddOpen(true);
    };

    const handleEditSuccess = () => {
        fetchData(); // Recargar datos después de editar
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalAddOpen(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            aplicarFiltros();
        }
    };

    const handleInputChange = (e, setFiltro) => {
        // Solo aceptar números positivos
        const value = e.target.value;
        if (value === "" || /^[0-9]+$/.test(value)) {
            setFiltro(value);
        }
    };

    return (
        <div className="RegistroVisitasBody">
            <div className="Title">
                <h1 className="Title_Content">Registro de visitas</h1>
            </div>

            <div className="ButtonContainer">
                <AddButton onClick={Añadir} />
                <EditButton onClick={Editar} />
                <DeleteButton onClick={Eliminar} />
            </div>

            <div className="Filtros">
                <input
                    type="number"
                    value={filtroMedico}
                    onChange={(e) => handleInputChange(e, setFiltroMedico)}
                    onKeyPress={handleKeyPress}
                    placeholder="Filtrar por médico"
                />

                <input
                    type="number"
                    value={filtroPaciente}
                    onChange={(e) => handleInputChange(e, setFiltroPaciente)}
                    onKeyPress={handleKeyPress}
                    placeholder="Filtrar por paciente"
                />

                <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Filtrar por fecha"
                />

                <button onClick={aplicarFiltros}>Aplicar filtros</button>
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
                        {filteredData.map((item, index) => (
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

            <EditRegistroVisitasForm 
                visitas={currentItem}
                onClose={closeModal}
                onSuccess={handleEditSuccess}
                isOpen={isModalOpen}
            />

            <AddVisitasForm
                onClose={closeModal}
                isOpen={isModalAddOpen}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
};

export default RegistroVisitas;
