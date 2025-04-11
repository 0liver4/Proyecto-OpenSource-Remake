import React, { useEffect, useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import EditSup from '../../../Backend/controllers/EditSup.js';

const EditMarcasForm = ({ marca, onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        id_marcas: '',
        nommarcas: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (marca) {
            setFormData({
                id_marcas: marca.id_marcas || '',
                nommarcas: marca.nommarcas || '',
                estado: marca.estado?.toString() || 'true'
            });
        }
    }, [marca]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.nommarcas) tempErrors.nommarcas = "El nombre de la marca es obligatorio";
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
            const success = await EditSup(formData, "marcas", "id_marcas");
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al actualizar la marca");
            }
        } catch (error) {
            console.error("Error al actualizar la marca:", error);
            alert("Hubo un error al actualizar la marca");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Editar Marca</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nommarcas">Nombre de Marca:</label>
                            <input
                                type="text"
                                id="nommarcas"
                                name="nommarcas"
                                value={formData.nommarcas}
                                onChange={handleChange}
                            />
                            {errors.nommarcas && <span className="error">{errors.nommarcas}</span>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>
                                Cancelar
                            </button>
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

export default EditMarcasForm;
