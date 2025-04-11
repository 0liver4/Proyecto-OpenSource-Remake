import React, { useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import AddSup from '../../../Backend/controllers/AddSup.js';

const AddMedicosForm = ({ onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        nommedico: '',
        cedulamedico: '',
        tandalaboral: '',
        especialidad: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.nommedico) tempErrors.nommedico = "El nombre del médico es obligatorio";
        if (!formData.cedulamedico) tempErrors.cedulamedico = "La cédula es obligatoria";
        if (!formData.tandalaboral) tempErrors.tandalaboral = "La tanda laboral es obligatoria";
        if (!formData.especialidad) tempErrors.especialidad = "La especialidad es obligatoria";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const success = await AddSup("medicos", formData);
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al agregar el médico");
            }
        } catch (error) {
            console.error("Error al agregar el médico:", error);
            alert("Hubo un error al agregar el médico");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Nuevo médico</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nommedico">Nombre:</label>
                            <input type="text" id="nommedico" name="nommedico" value={formData.nommedico} onChange={handleChange} />
                            {errors.nommedico && <span className="error">{errors.nommedico}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cedulamedico">Cédula:</label>
                            <input type="text" id="cedulamedico" name="cedulamedico" value={formData.cedulamedico} onChange={handleChange} />
                            {errors.cedulamedico && <span className="error">{errors.cedulamedico}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="tandalaboral">Tanda Laboral:</label>
                            <input type="text" id="tandalaboral" name="tandalaboral" value={formData.tandalaboral} onChange={handleChange} />
                            {errors.tandalaboral && <span className="error">{errors.tandalaboral}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="especialidad">Especialidad:</label>
                            <input type="text" id="especialidad" name="especialidad" value={formData.especialidad} onChange={handleChange} />
                            {errors.especialidad && <span className="error">{errors.especialidad}</span>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                                {isSubmitting ? "Guardando..." : "Agregar Médico"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMedicosForm;
