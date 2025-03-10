import getSupabaseClient from "../../Backend/config/supabase"; // Asegúrate de importar correctamente
//id del item, nombre de la tabla, nombre de la columna
const AddSup = async (tabla, data) => {
    const supabase = getSupabaseClient();

    const { error } = await supabase
        .from(tabla)
        .insert(data)


    if (error) {
        console.error("Hubo un error al agregar:", error.message);
        return false;
    }

    console.log("Elemento agregado correctamente");
    return true;
};

export default AddSup;
