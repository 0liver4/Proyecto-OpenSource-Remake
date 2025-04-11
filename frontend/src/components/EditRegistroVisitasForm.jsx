import React, { useEffect, useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import EditSup from '../../../Backend/controllers/EditSup.js';

const EditVisitasForm = ({ visitas, onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        id_visitas: '',
        medico: '',
        paciente: '',
        fecha: '',
        hora: '',
        sintomas: '',
        medicamentos: '',
        recomendaciones: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (visitas) {
            setFormData({
                id_visitas: visitas.id_visitas || '',
                medico: visitas.medico || '',
                paciente: visitas.paciente || '',
                fecha: visitas.fecha || '',
                hora: visitas.hora || '',
                sintomas: visitas.sintomas || '',
                medicamentos: visitas.medicamentos || '',
                recomendaciones: visitas.recomendaciones || '',
                estado: visitas.estado?.toString() || 'true'
            });
        }
    }, [visitas]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.medico) tempErrors.medico = "El médico es obligatorio";
        if (!formData.paciente) tempErrors.paciente = "El paciente es obligatorio";
        if (!formData.fecha) tempErrors.fecha = "La fecha es obligatoria";
        if (!formData.hora) tempErrors.hora = "La hora es obligatoria";
        if (!formData.sintomas) tempErrors.sintomas = "Los síntomas son obligatorios";
        if (!formData.medicamentos) tempErrors.medicamentos = "Los medicamentos son obligatorios";
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
            const success = await EditSup(formData, "visitas", "id_visitas");
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al actualizar la visita");
            }
        } catch (error) {
            console.error("Error al actualizar la visita:", error);
            alert("Hubo un error al actualizar la visita");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Editar visita</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="medico">ID médico:</label>
                            <input type="number" id="medico" name="medico" value={formData.medico} onChange={handleChange} />
                            {errors.medico && <span className="error">{errors.medico}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="paciente">ID paciente:</label>
                            <input type="number" id="paciente" name="paciente" value={formData.paciente} onChange={handleChange} />
                            {errors.paciente && <span className="error">{errors.paciente}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha:</label>
                            <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} />
                            {errors.fecha && <span className="error">{errors.fecha}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="hora">Hora:</label>
                            <input type="time" id="hora" name="hora" value={formData.hora} onChange={handleChange} />
                            {errors.hora && <span className="error">{errors.hora}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="sintomas">Síntomas:</label>
                            <input type="text" id="sintomas" name="sintomas" value={formData.sintomas} onChange={handleChange} />
                            {errors.sintomas && <span className="error">{errors.sintomas}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="medicamentos">Medicamentos:</label>
                            <input type="text" id="medicamentos" name="medicamentos" value={formData.medicamentos} onChange={handleChange} />
                            {errors.medicamentos && <span className="error">{errors.medicamentos}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="recomendaciones">Recomendaciones:</label>
                            <input type="text" id="recomendaciones" name="recomendaciones" value={formData.recomendaciones} onChange={handleChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditVisitasForm;
