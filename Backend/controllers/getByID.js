import getSupabaseClient from "../../db/supabase";

const getByIDData = async (tableName,columna, id) => {
    try {
        const supabase = getSupabaseClient();

        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .eq(columna, id) // Filtra por ID
            .maybeSingle(); // Devuelve solo un resultado o null si no existe

        if (error) throw error;
        return data;
    } catch (error) {
        console.error(`Error al obtener ${tableName} con ID ${id}:`, error);
        return null;
    }
};

export default getByIDData;
