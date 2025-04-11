import React, { useState, useEffect } from 'react';
import '../css/Farmacos.css';
import '../css/Modal.css';
import EditSup from '../../../Backend/controllers/EditSup.js';

const EditProductosForm = ({ currentItem, onClose, onSuccess, isOpen }) => {

    const [formData, setFormData] = useState({
        id_producto: "",
        nomproducto: "",
        catproducto:"",
        descproducto: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if(currentItem) {
            setFormData({
                id_producto: currentItem.id_producto ,
                nomproducto: currentItem.nomproducto ,
                catproducto: currentItem.catproducto ,
                descproducto: currentItem.descproducto ,
            })

        }
       
    },[currentItem])



    const validateForm = () => {
        let tempErrors = {};

        if (!formData.nomproducto) tempErrors.nomproducto = 'El nombre del producto es obligatorio';
        if (!formData.catproducto) tempErrors.catproducto = 'La categoría del producto es obligatoria';
        if (!formData.descproducto) tempErrors.descproducto = 'La descripción es obligatoria';
        

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        })); 
        
    };

    const updateTipoPaciente = async (formData) => {
        try {
            const success = await EditSup(
                {
                    ...formData,
                    id_producto: currentItem.id_producto ?? null
                },
                "productos",       // 👈 nombre de la tabla en Supabase
                "id_producto"     // 👈 nombre de la columna clave primaria
            );
    
            if (!success) {
                console.error("La actualización falló.");
            }
        } catch (error) {
            console.error("Error al actualizar el tipo de paciente:", error);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        await updateTipoPaciente(formData);

        try {
            const success = await EditSup(formData, 'productos', 'id_producto');

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
                    <h2>Editar producto</h2>
                    <button className='modal-close' onClick={onClose}>&times;</button>
                </div>

                <div className='modal-body'>
                    <form onSubmit={handleSubmit}>

                        <div className='form-group'>
                            <label htmlFor='nomproducto'>Nombre del producto:</label>
                            <input
                                type='text'
                                id='nomproducto'
                                name='nomproducto'
                                value={formData.nomproducto ?? "sin nombre"}
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
