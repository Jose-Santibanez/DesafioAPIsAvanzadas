import express from 'express'; // importamos express
import cors from 'cors'; // importamos CORS
/* import { joyasModels } from './models/joyas.models.js';  // importamos el models donde obtenemos los datos */
import joyasRoutes from './routes/joyas.route.js'
const app = express(); // Creamos una instancia de express
 

app.use(cors());  // usamos el middleware de CORS
app.use(express.json()) // utilizamos el middleware para parsear el contenido entre el cliente y el servidor a JSON
app.use('/joyas',joyasRoutes)//Mediante un middleware obtenemos las rutas de inventario
app.listen(4000, () => console.log(`servidor encendido`));  // encendemos el servidor y lo dejamos escuchando en el puerto 4000

/* 
// Petición GET para leer todo inventario
app.get('/joyas', async (req, res) => {
    const queryStrings = req.query  // Extraemmos de los parametros de la URL con descruturing { limit } por defecto 5
// Estructura de control para manejar errores
   try{  // Si sale todo bien
        const joyas = await joyasModels.obtenerInventario(queryStrings)  // ejecutamos la función obtenerInventario() con argumento limit extraido de la URL
        return res.json(joyas)  // retornamos al cliente un JSON con lo obtenido de la función
   }catch(err){ // Para manejar el error
        console.error(err)  // mostramos el error por consola
        return res.status(500).json({message : 'Internal Server Error'})  // retornamos al cliente el error 
   }
})

 */