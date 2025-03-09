import getSupabaseClient from "../../Backend/config/supabase"; 

const EditSup = async (data, tabla, columna) => {
    const id = data.id_paciente;
    const supabase = getSupabaseClient();
    console.log(id,'dato en el get')
    if (!id) {
        console.log("Error: ID no proporcionado");
        return false;
    }

    const { error } = await supabase
        .from(tabla)
        .update(data)
        .eq(columna, id)


    if (error) {
        console.error("Hubo un error al editar:", error.message);
        return false;
    }

    console.log("Elemento editado correctamente");
    return true;
};

export default EditSup;
