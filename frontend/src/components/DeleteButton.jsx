import '../css/Buttons.css';

function DeleteButton({ onClick }) {
    return (
        <button className="Delete" onClick={onClick}>
            Eliminar
        </button>
    );
}

export default DeleteButton;
