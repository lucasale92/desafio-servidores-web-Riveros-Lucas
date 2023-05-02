// Se importa el módulo "fs" para manejar archivos
import fs from 'fs';

class ProductManager {
constructor() {
// Ruta donde se encuentra el archivo "productos.json"
this.path = './scr/productos.json';
}

// Método para obtener todos los productos
async getProducts() {
try {
// Se verifica si existe el archivo "productos.json"
if (fs.existsSync(this.path)) {
// Se lee el archivo
const data = await fs.promises.readFile(this.path, 'utf8');
// Se convierte el archivo a un objeto JSON
return JSON.parse(data);
}
// Si no existe el archivo se crea vacío
await fs.promises.writeFile(this.path, JSON.stringify([]));
// Se retorna un array vacío
return [];
} catch (error) {
// Si ocurre algún error se captura y se lanza otro error personalizado
throw new Error(error.message);
}
}

// Método para agregar un producto
async addProduct(product) {
try {
// Se obtienen todos los productos
let data = await this.getProducts();
// Se verifica si ya existe un producto con el mismo código
const checkCode = data.find((p) => p.code === product.code);
if (checkCode) {
// Si existe, se lanza un error personalizado
throw new Error('El código ya existe');
}
if (
!product.title ||
!product.description ||
!product.price ||
!product.thumbnail ||
!product.code ||
!product.stock
) {
// Si faltan campos por completar, se lanza un error personalizado
throw new Error('Faltan campos por completar');
}
// Se obtiene el último ID de producto y se suma uno para el nuevo producto
const lastProductId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
console.log(lastProductId);
// Se crea un nuevo producto con el ID correspondiente
const newProduct = { ...product, id: lastProductId };
// Se agrega el nuevo producto al array de productos
data.push(newProduct);
// Se convierte el array de productos a una cadena JSON
const productString = JSON.stringify(this.products, null, 2);
// Se escribe la cadena JSON en el archivo "productos.json"
await fs.promises.writeFile('productos.json', productString);
return newProduct
}
catch{error}{
throw new Error (error.message);
}
}


// Se define una función async llamada getProductById que recibe como parámetro un ID
async getProductById(id) {
  try{
  // Se obtiene el array de productos
    let data = await this.getProducts(); 
    // Se busca el producto correspondiente al ID
  const productFound = data.find((product) => product.id === id); 
  // Si no se encuentra el producto, se retorna null
  if (!productFound){ 
  return null
  }
  // Si se encuentra el producto, se retorna el objeto correspondiente
  return productFound; 
  }
  // Si ocurre algún error se captura y se lanza otro error personalizado
  catch{error}{ 
  throw new Error (error.message);
  }
  }
  
  // Se define una función async llamada updateProduct que recibe como parámetro un ID y un objeto con la información actualizada
  async updateProduct(id, newData) {
    // Se obtiene el array de productos
  let data = await this.getProducts(); 
  // Se busca la posición en el array del producto correspondiente al ID
  const position = data.findIdex((product) => product.id === id) 
  // Si se encuentra la posición del producto, se actualiza su información
  if (position !== -1){ 
  data[position] = {... data[position]}, newData;
  // Se convierte el array de productos a una cadena JSON
  const productString = JSON.stringify(data, null, 2) 
  // Se escribe la cadena JSON en el archivo "productos.json"
  await fs.promises.writeFileSync('productos.json', productString) 
   // Se retorna un mensaje de éxito
  return "product updated successfully"
  }
  }

deleteProduct(id) {
// Se filtra el array de productos para eliminar el producto con el ID indicado
this.products = this.products.filter((product) => product.id !== id);
//
  const product1 = {
    title:"producto prueba",
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail:
      'Sin imagen',
    code: 'abc123',
    stock: 20,
  };
  const product2 = {
    title:"papita",
  //  const productManager = new ProductManager()
  //  const asyncFn = async ()=>{
  //   console.log(await productManager.addProduct(product1))
  //   console.log(await productManager.updateProduct(1, product2))
  //   console.log(await productManager.getProductById(400))
}}}
  //  asyncFn();

module.exports = ProductManager;