import React, { useState, useEffect } from 'react';
import '../css/Farmacos.css';
import '../css/Modal.css';
import EditSup from '../../../Backend/controllers/EditSup.js';

const EditProductosForm = ({ farmacos, onClose, onSuccess, isOpen }) => {
    const [formData, setFormData] = useState({
        id_producto: '',
        nomproducto: '',
        catproducto: '',
        descproducto: '',
        marcaproducto: '',
        estado: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (farmacos) {
            console.log("Datos del producto antes de establecer el estado:", producto);
            setFormData({
                id_producto: farmacos.id_producto || '',
                nomproducto: farmacos.nomproducto || '',
                catproducto: farmacos.catproducto || '',
                descproducto: farmacos.descproducto || '',
                marcaproducto: farmacos.marcaproducto || '',
                estado: farmacos.estado || ''
            });
        }
    }, [farmacos]);
    

    const validateForm = () => {
        let tempErrors = {};

        if (!formData.nomproducto) tempErrors.nomproducto = 'Elasdasde del producto es obligatorio';
        if (!formData.catproducto) tempErrors.catproducto = 'La categoría del producto es obligatoria';
        if (!formData.descproducto) tempErrors.descproducto = 'La descripción es obligatoria';
        if (!formData.marcaproducto) tempErrors.marcaproducto = 'La marca del producto es obligatoria';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const success = await EditSup(formData, 'farmacos', 'id_producto');

            if (success) {
                onSuccess();
                onClose();
            } else {
                alert('Hubo un error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error al editar el producto:', error);
            alert('Hubo un error al actualizar el producto');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className='modal-backdrop'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2>Editar Producto</h2>
                    <button className='modal-close' onClick={onClose}>&times;</button>
                </div>

                <div className='modal-body'>
                    <form onSubmit={handleSubmit}>

                        <div className='form-group'>
                            <label htmlFor='nomproducto'>Nombre del Producto:</label>
                            <input
                                type='text'
                                id='nomproducto'
                                name='nomproducto'
                                value={formData.nomproducto}
                                onChange={handleChange}
                            />
                            {errors.nomproducto && <span className='error'>{errors.nomproducto}</span>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='catproducto'>Categoría:</label>
                            <input
                                type='number'
                                id='catproducto'
                                name='catproducto'
                                value={formData.catproducto}
                                onChange={handleChange}
                            />
                            {errors.catproducto && <span className='error'>{errors.catproducto}</span>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='descproducto'>Descripción:</label>
                            <textarea
                                id='descproducto'
                                name='descproducto'
                                value={formData.descproducto}
                                onChange={handleChange}
                            />
                            {errors.descproducto && <span className='error'>{errors.descproducto}</span>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='marcaproducto'>Marca:</label>
                            <input
                                type='number'
                                id='marcaproducto'
                                name='marcaproducto'
                                value={formData.marcaproducto}
                                onChange={handleChange}
                            />
                            {errors.marcaproducto && <span className='error'>{errors.marcaproducto}</span>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='estado'>Estado:</label>
                            <input
                                type='checkbox'
                                id='estado'
                                name='estado'
                                checked={formData.estado}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='modal-footer'>
                            <button
                                type='button'
                                className='cancel-button'
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type='submit'
                                className='submit-button'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductosForm;
