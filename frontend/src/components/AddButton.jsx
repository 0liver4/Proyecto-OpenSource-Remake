import '../css/Buttons.css';

function AddButton({ onClick }) {
    return (
        <button className="Add" onClick={onClick}>
            Añadir
        </button>
    );
}

export default AddButton;
