import React, { useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import AddSup from '../../../Backend/controllers/AddSup.js';

const AddUbicacionesForm = ({ onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        descalmacenar: '',
        estante: '',
        tramo: '',
        celda: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.estante) tempErrors.estante = "El estante es obligatorio";
        if (!formData.tramo) tempErrors.tramo = "El tramo es obligatorio";
        if (!formData.celda) tempErrors.celda = "La celda es obligatoria";
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
            const success = await AddSup("almacenar", formData);
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al agregar la ubicación");
            }
        } catch (error) {
            console.error("Error al agregar la ubicación:", error);
            alert("Hubo un error al agregar la ubicación");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Nueva ubicación</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="descalmacenar">Descripción:</label>
                            <input type="text" id="descalmacenar" name="descalmacenar" value={formData.descalmacenar} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estante">Estante:</label>
                            <input type="text" id="estante" name="estante" value={formData.estante} onChange={handleChange} />
                            {errors.estante && <span className="error">{errors.estante}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="tramo">Tramo:</label>
                            <input type="text" id="tramo" name="tramo" value={formData.tramo} onChange={handleChange} />
                            {errors.tramo && <span className="error">{errors.tramo}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="celda">Celda:</label>
                            <input type="text" id="celda" name="celda" value={formData.celda} onChange={handleChange} />
                            {errors.celda && <span className="error">{errors.celda}</span>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                                {isSubmitting ? "Guardando..." : "Agregar Ubicación"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUbicacionesForm;
