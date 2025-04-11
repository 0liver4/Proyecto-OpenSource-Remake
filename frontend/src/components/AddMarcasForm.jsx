import React, { useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import AddSup from '../../../Backend/controllers/AddSup.js';

const AddMarcasForm = ({ onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        nommarcas: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const success = await AddSup("marcas", formData);
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al agregar la marca");
            }
        } catch (error) {
            console.error("Error al agregar la marca:", error);
            alert("Hubo un error al agregar la marca");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Nueva marca</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nommarcas">Nombre de marca:</label>
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
                                {isSubmitting ? "Guardando..." : "Agregar Marca"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMarcasForm;