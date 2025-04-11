import React, { useEffect, useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import EditSup from '../../../Backend/controllers/EditSup.js';

const EditCategoriasForm = ({ categoria, onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        id_categoria: '',
        nomcategoria: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (categoria) {
            setFormData({
                id_categoria: categoria.id_categoria || '',
                nomcategoria: categoria.nomcategoria || '',
                estado: categoria.estado?.toString() || 'true'
            });
        }
    }, [categoria]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.nomcategoria) tempErrors.nomcategoria = "El nombre de la categoría es obligatorio";
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
            const success = await EditSup(formData, "categorias", "id_categoria");
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al actualizar la categoría");
            }
        } catch (error) {
            console.error("Error al actualizar la categoría:", error);
            alert("Hubo un error al actualizar la categoría");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Editar Categoría</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nomcategoria">Nombre de Categoría:</label>
                            <input
                                type="text"
                                id="nomcategoria"
                                name="nomcategoria"
                                value={formData.nomcategoria}
                                onChange={handleChange}
                            />
                            {errors.nomcategoria && <span className="error">{errors.nomcategoria}</span>}
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

export default EditCategoriasForm;
