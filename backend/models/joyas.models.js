import { pool } from "../database/connection.js";

// Obterner joyas

const obtenerInventario = async (limit = 2)=>{
    const query = 'select * from inventario limit $1'

    const {rows} = await pool.query(query,[limit])
    
    return rows
}


export const joyasModels = {    
        obtenerInventario,
}