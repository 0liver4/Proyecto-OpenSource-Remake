import React, { useState } from 'react';
import '../css/Paciente.css';
import '../css/Modal.css';
import AddSup from '../../../Backend/controllers/AddSup.js';

const AddProductosForm = ({ onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        nomproducto: '',
        catproducto: '',
        descproducto: '',
        marcaproducto: '',
        estado: 'true'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.nomproducto) tempErrors.nomproducto = "El nombre del producto es obligatorio";
        if (!formData.catproducto) tempErrors.catproducto = "La categoría es obligatoria";
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
            const success = await AddSup("productos", formData);
            if (success) {
                onSuccess();
                onClose();
            } else {
                alert("Hubo un error al agregar el producto");
            }
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            alert("Hubo un error al agregar el producto");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Nuevo producto</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nomproducto">Nombre del producto:</label>
                            <input type="text" id="nomproducto" name="nomproducto" value={formData.nomproducto} onChange={handleChange} />
                            {errors.nomproducto && <span className="error">{errors.nomproducto}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="catproducto">Categoría:</label>
                            <input type="number" id="catproducto" name="catproducto" value={formData.catproducto} onChange={handleChange} />
                            {errors.catproducto && <span className="error">{errors.catproducto}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="descproducto">Descripción:</label>
                            <input type="text" id="descproducto" name="descproducto" value={formData.descproducto} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="marcaproducto">Marca:</label>
                            <input type="number" id="marcaproducto" name="marcaproducto" value={formData.marcaproducto} onChange={handleChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="cancel-button" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                                {isSubmitting ? "Guardando..." : "Agregar Producto"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductosForm;
