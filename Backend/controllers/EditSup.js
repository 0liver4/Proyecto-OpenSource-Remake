import getSupabaseClient from "../../Backend/config/supabase";

const EditSup = async (data, tabla, columna) => {
    const supabase = getSupabaseClient();
    const id = data[columna]; // Se obtiene el ID usando el nombre de columna clave

    console.log(data, '📦 Datos recibidos para actualizar');
    console.log(id, '🔑 ID extraído para búsqueda');

    if (!id) {
        console.error(`❌ Error: No se proporcionó valor para la columna clave '${columna}'`);
        return false;
    }

    const { error } = await supabase
        .from(tabla)
        .update(data)
        .eq(columna, id);

    if (error) {
        console.error("❌ Hubo un error al editar:", error.message);
        return false;
    }

    console.log("✅ Elemento editado correctamente");
    return true;
};

export default EditSup;
