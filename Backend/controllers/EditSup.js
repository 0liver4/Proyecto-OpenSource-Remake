import getSupabaseClient from "../../Backend/config/supabase";

const updateSupabaseRecord = async (data, table, column) => {
    const id = data.id_paciente || data.id_producto;
    const supabase = getSupabaseClient();

    if (!id) {
        console.error("Error: ID no proporcionado. Se esperaba 'id_paciente' o 'id_producto'.");
        return false;
    }

    console.log(`Attempting to update record with ID: ${id}`);

    const { error } = await supabase
        .from(table)
        .update(data)
        .eq(column, id);

    if (error) {
        console.error("Hubo un error al editar:", error.message);
        return false;
    }

    console.log("Elemento editado correctamente");
    return true;
};

export default updateSupabaseRecord;