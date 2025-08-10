import { pool } from "../database/connection.js";
import format from "pg-format";

import "dotenv/config";

// Creamos una constante BASE_URL según el entorno
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN_URL_APP
    : `http://localhost:${process.env.PORT}`;

// Obterner joyas
const obtenerInventario = async ({
  limits = 5,
  page = 1,
  order = "id_asc",
}) => {
  // query para saber la cantidad de registros en inventario
  const countQuery = "select count(*) from inventario";
  // ejecutamos la query mediante el pool de conexiones
  const { rows: countResult } = await pool.query(countQuery); // usamos el destructuring para quedarnos solo con rows y renombrarlo countResult
  // la query nos devuelve un string por lo cual parseamos el string a entero
  const total_rows = parseInt(countResult[0].count, 10); // parseamos el primer elemento del array countResult y el nombre del objeto count, valor 10 indica la conversión en base decimal para evitar errores

  // dividimos el total de registros por el limits para obtener el número total de paginas
  const total_pages = Math.ceil(total_rows / limits); // math.ceil() redondea el valor hacia arriba al entero mas cercano

  const offset = (page - 1) * limits;
  const [campo, direccion] = order.split("_");

  const query = "select * from inventario order by %s %s limit %s offset %s";

  let FormatedQuery = format(query, campo, direccion, limits, offset);
  const { rows } = await pool.query(FormatedQuery);

  const reuslts = rows.map((row) => {
    return {
      ...row,
      href: `${BASE_URL}/joyas/${row.id}`,
    };
  });

  return {
    reuslts,
    total_pages,
    page,
    limits,
    next:
      total_pages <= page
        ? null
        : `${BASE_URL}/joyas?limits=${limits}&page=${page}&order=${order}`,
    previus:
      page <= 1
        ? null
        : `${BASE_URL}/joyas?limits=${limits}&page=${page}&order${order}`,
  };
};

const obtenerInventarioFiltros = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];
  const valores = [];
  const agregarFiltro = (campo, comparador, valor) => {
    valores.push(valor);
    const { length } = filtros;
    
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };
  if (precio_min) agregarFiltro("precio", ">=", precio_min);
  if (precio_max) agregarFiltro("precio", "<=", precio_max);
  if (categoria) agregarFiltro("categoria", "=", categoria);
  if (metal) agregarFiltro("metal", "=", metal);

  let query = "select * from inventario";

  if (filtros.length > 0) {
    filtros = filtros.join(" and ");
    query += ` where ${filtros}`;
  }

  const { rows } = await pool.query(query, valores);

  return rows;
};

export const joyasModels = {
  obtenerInventario,
  obtenerInventarioFiltros,
};
