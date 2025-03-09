import '../css/Buttons.css';

function EditButton({ onClick }) {
    return (
        <button className="Edit" onClick={onClick}>
            Editar
        </button>
    );
}

export default EditButton;
