import { pool } from "../database/connection.js";
import format from "pg-format";

// Obterner joyas

const obtenerInventario = async ({limits = 5, page = 1, order = 'id_asc'} ) => {
  const offset = (page - 1) * limits;
  const [campo, direccion ] = order.split('_');
  
  const query = "select * from inventario order by %s %s limit %s offset %s";

  let FormatedQuery = format(query,campo,direccion,limits,offset)
  const { rows  } = await pool.query(FormatedQuery);
   
  return rows;
};

export const joyasModels = {
  obtenerInventario,
};
