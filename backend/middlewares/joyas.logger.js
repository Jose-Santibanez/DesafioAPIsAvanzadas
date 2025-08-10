export const logger = ( req, res , next) =>{
    const registro = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;

    console.log(registro.trim());

    next();
}