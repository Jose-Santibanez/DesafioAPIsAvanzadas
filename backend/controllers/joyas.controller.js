import { joyasModels } from "../models/joyas.models.js"// importamos el Modelo de inventario


const obtenerInventario = async (req, res) => {
    const queryStrings = req.query  // Extraemmos de los parametros de la URL con descruturing { limit } por defecto 5
// Estructura de control para manejar errores
   try{  // Si sale todo bien
        const joyas = await joyasModels.obtenerInventario(queryStrings)  // ejecutamos la función obtenerInventario() con argumento limit extraido de la URL
        return res.json(joyas)  // retornamos al cliente un JSON con lo obtenido de la función
   }catch(err){ // Para manejar el error
        console.error(err)  // mostramos el error por consola
        return res.status(500).json({message : 'Internal Server Error'})  // retornamos al cliente el error 
   }
}

export const JoyasController = {
    obtenerInventario,
}