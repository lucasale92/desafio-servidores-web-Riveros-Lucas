// Importación del módulo express y la clase ProductManager
import express from "express";
import ProductManager from "./productManager.js";

// Instanciación de la clase ProductManager y creación de la aplicación express
const productManager = new ProductManager('./productos.json');
const app = express();
const PORT = 8080;

// Middleware para parsear el cuerpo de las solicitudes HTTP
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Inicialización del servidor HTTP
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit; // Obtiene el parámetro limit de la consulta (si existe)
        const products = await productManager.getProducts(); // Obtiene todos los productos
        if (limit) {
            // Si se proporcionó un parámetro limit, devuelve sólo los primeros productos hasta el límite especificado
            res.status(200).json(products.slice(0, limit));
        } else {
            // Si no se proporcionó un parámetro limit, devuelve todos los productos
            res.status(200).json(products);
        }
    } catch (error) {
        // Si se produce un error, devuelve un mensaje de error con un código de estado HTTP 500
        res.status(500).json({message: "error"});
    }
});

// Ruta para obtener un producto por ID
app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params; // Obtiene el parámetro ID de la URL
        const products = await productManager.getProductsById(parseInt(id)); // Obtiene el producto por ID
        if (!products) {
            // Si no se encuentra ningún producto, devuelve un mensaje de error con un código de estado HTTP 400
            return res.status(400).json({error: "product not found"});
        } else {
            // Si se encuentra el producto, devuelve los detalles del producto
            res.status(200).json(products);
        }
    } catch (error) {
        // Si se produce un error, devuelve un mensaje de error con un código de estado HTTP 500
        res.status(500).json({message: "error"});
    }
});
