import getSupabaseClient from "../../Backend/config/supabase";

const getAllData = async (tableName, filters = {}) => {
    try {
        const supabase = getSupabaseClient();
        let query = supabase.from(tableName).select('*');

        // Aplicar filtros opcionales
        Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value);
        });

        const { data, error } = await query;
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return null;
    }
};

export default getAllData