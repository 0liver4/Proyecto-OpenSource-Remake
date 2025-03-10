import React, { useState, useEffect } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import EditSup from "../../../Backend/controllers/EditSup.js";

const EditPacientesForm = ({ paciente, onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        id_paciente: '',
        nompaciente: '',
        cedulapaciente: '',
        numcarnet: '',
        tipopaciente: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (paciente) {
            setFormData({
                id_paciente: paciente.id_paciente || '',
                nompaciente: paciente.nompaciente || '',
                cedulapaciente: paciente.cedulapaciente || '',
                numcarnet: paciente.numcarnet || '',
                tipopaciente: paciente.tipopaciente || ''
            });
        }
    }, [paciente]);

    const validateForm = () => {
        let tempErrors = {};
        
        if (!formData.nompaciente) tempErrors.nompaciente = "El nombre es obligatorio";
        if (!formData.cedulapaciente) tempErrors.cedulapaciente = "La cédula es obligatoria";
        if (!formData.numcarnet) tempErrors.numcarnet = "El número de carnet es obligatorio";
        if (!formData.tipopaciente) tempErrors.tipopaciente = "El tipo de paciente es obligatorio";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === "tipopaciente") {
            await updateTipoPaciente(value);
        }
    };

    const updateTipoPaciente = async (tipo) => {
        try {
            const success = await EditSup(
                { ...formData, tipopaciente: tipo },
                "paciente",
                "id_paciente"
            );

            if (!success) {
                alert("Hubo un error al actualizar el tipo de paciente");
            }
        } catch (error) {
            console.error("Error al actualizar el tipo de paciente:", error);
            alert("Hubo un error al actualizar el tipo de paciente");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const success = await EditSup(
                formData, 
                "paciente", 
                "id_paciente"
            );
            
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al actualizar el paciente");
            }
        } catch (error) {
            console.error("Error al editar el paciente:", error);
            alert("Hubo un error al actualizar el paciente");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Editar Paciente</h2>
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
                            <label htmlFor="numcarnet">Número de Carnet:</label>
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
                            <label htmlFor="tipopaciente">Tipo de Paciente:</label>
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
                                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPacientesForm;