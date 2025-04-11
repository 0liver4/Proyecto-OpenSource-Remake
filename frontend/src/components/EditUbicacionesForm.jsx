import React, { useEffect, useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import EditSup from '../../../Backend/controllers/EditSup.js';

const EditUbicacionesForm = ({ almacenar, onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        id_apartado: '',
        descalmacenar: '',
        estante: '',
        tramo: '',
        celda: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (almacenar) {
            setFormData({
                id_apartado: almacenar.id_apartado || '',
                descalmacenar: almacenar.descalmacenar || '',
                estante: almacenar.estante || '',
                tramo: almacenar.tramo || '',
                celda: almacenar.celda || '',
                estado: almacenar.estado?.toString() || 'true'
            });
        }
    }, [almacenar]);

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
            const success = await EditSup(formData, "almacenar", "id_apartado");
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al actualizar la ubicación");
            }
        } catch (error) {
            console.error("Error al actualizar la ubicación:", error);
            alert("Hubo un error al actualizar la ubicación");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Editar ubicación</h2>
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
                                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUbicacionesForm;
