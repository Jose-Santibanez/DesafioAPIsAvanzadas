
import 'dotenv/config' // importamos las variables de entorno de .ennv con 'dotenc/config'

import pkg from 'pg' // importamos el cliente pgSQL para node

const { Pool } = pkg // extraemos la clase Pool del cliente pkg para el pool de conexiones
export const pool = new Pool({ // creamos una nueva instancia de la clase Pool
    allowExitOnIdle:true    // nos permite abrir una conexion cada vez que se consulta a la BD, luego se cierra
})

try{
    await pool.query('select now()');
    console.log('db joyas conectada')
}catch(err){
    console.log(err)
}