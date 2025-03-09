import  getSupabaseClient  from "../../Backend/config/supabase"; // Asegúrate de importar correctamente
                            //id del item, nombre de la tabla, nombre de la columna
const DeletedSup = async (id, tabla, columna) => {
    const supabase = getSupabaseClient();
    if (!id) {
        console.log("Error: ID no proporcionado");
        return false;
    }

    const { error } = await supabase
        .from(tabla)   // Nombre de la tabla en Supabase
        .delete()
        .eq(columna, id); // Comparación con la columna correcta

    if (error) {
        console.error("Hubo un error al eliminar:", error.message);
        return false;
    }

    console.log("Elemento eliminado correctamente");
    return true;
};

export default DeletedSup;
