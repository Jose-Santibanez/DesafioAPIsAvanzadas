import { Router } from "express"; // importamos el enrutador
import { JoyasController } from "../controllers/joyas.controller.js";// importamos el icontrolador de inventario en rutas 
const router = Router() // creamos una instancia del enrutador de express

router.get('/', JoyasController.obtenerInventario)
router.get('/filtros',JoyasController.obtenerInventarioFiltros)

export default router