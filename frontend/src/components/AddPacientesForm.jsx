import React, { useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import AddSup from '../../../Backend/controllers/AddSup.js';

const AddPacientesForm = ({ onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        nompaciente: '',
        cedulapaciente: '',
        numcarnet: '',
        tipopaciente: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let tempErrors = {};

        if (!formData.nompaciente) tempErrors.nompaciente = "El nombre es obligatorio";
        if (!formData.cedulapaciente) tempErrors.cedulapaciente = "La cédula es obligatoria";
        if (!formData.numcarnet) tempErrors.numcarnet = "El número de carnet es obligatorio";
        if (!formData.tipopaciente) tempErrors.tipopaciente = "El tipo de paciente es obligatorio";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const success = await AddSup("paciente", formData);

            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al agregar el paciente");
            }
        } catch (error) {
            console.error("Error al agregar el paciente:", error);
            alert("Hubo un error al agregar el paciente");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Nuevo paciente</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nompaciente">Nombre:</label>
                            <input 
                                type="text" 
                                id="nompaciente" 
                                name="nompaciente" 
                                value={formData.nompaciente} 
                                onChange={handleChange} 
                            />
                            {errors.nompaciente && <span className="error">{errors.nompaciente}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="cedulapaciente">Cédula:</label>
                            <input 
                                type="text" 
                                id="cedulapaciente" 
                                name="cedulapaciente" 
                                value={formData.cedulapaciente} 
                                onChange={handleChange} 
                            />
                            {errors.cedulapaciente && <span className="error">{errors.cedulapaciente}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="numcarnet">Número de carnet:</label>
                            <input 
                                type="text" 
                                id="numcarnet" 
                                name="numcarnet" 
                                value={formData.numcarnet} 
                                onChange={handleChange} 
                            />
                            {errors.numcarnet && <span className="error">{errors.numcarnet}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="tipopaciente">Tipo de paciente:</label>
                            <select 
                                id="tipopaciente" 
                                name="tipopaciente"
                                value={formData.tipopaciente}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="1">Estudiante</option>
                                <option value="2">Maestro</option>
                                <option value="3">Empleado</option>
                            </select>
                            {errors.tipopaciente && <span className="error">{errors.tipopaciente}</span>}
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="cancel-button" 
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Guardando..." : "Agregar Paciente"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPacientesForm;