const { error } = require('console');
const fs = require('fs');
class ProductManager {
    // inicializo el id en 1
    id = 1;

    constructor() {
      this.path = 'productos.json';
      //this.id  = this.id;
    }
    async getProducts() {
      try{
        if(fs.existsSync(this.path)){
          const data = await fs.promises.readFile(this.path, 'utf8');
          return JSON.parse(data);
        }
        await fs.promises.writeFile(this.path, JSON.stringify([]));
        return [];
      } catch{error}{
        throw new Error (error.message);
      }
    }
    async addProduct(product) {
      try{
        let data = await this.getProducts();
        const checkCode = data.find((p) => p.code === product.code);
        if (checkCode) {
          throw new Error('El codigo ya existe');
        }
        if (
          !product.title ||
          !product.description ||
          !product.price ||
          !product.thumbnail ||
          !product.code ||
          !product.stock
        ) {
          throw new Error('faltan campos por completar');
        }
        const lastProductId =
        data.length > 0 ? data[data.length - 1].id+1:1;
        console.log(lastProductId);
        const newProduct = { ...product, id: lastProductId,}
        data.push(newProduct);
        const productString = JSON.stringify(this.products, null, 2)
        await fs.promises.writeFile("productos.json", productString)
        return newProduct
      }
      catch{error}{
        throw new Error (error.message);
      }
    }
    
    // llamo al metodo getProductById
    async getProductById(id) {
      try{
        let data = await this.getProducts();
        const productFound = data.find((product) => product.id === id);
        if (productFound) {
          return productFound;
        }else{
          return null;
        }
      }
      catch{error}{
        throw new Error (error.message);
      }

      
    }


    // llamo al método updateProduct que actualiza los productos en el archivo JSON
    updateProduct() {
      const productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
    }
    // llamo al método deleteProduct que elimina un producto por id
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
      const productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
    }
}
  // Crea dos objetos de prueba
  const product = {
    title:"producto prueba",
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail:
      'Sin imagen',
    code: 'abc123',
    stock: 20,
  };
  const product2 = {
    title:"producto prueba",
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail:
      'Sin imagen',
    code: 'abc123',
    stock: 20,
  };
  
  // Creo una nueva instancia de ProductManager
  const productManager = new ProductManager("productos.json");
  
  // Agrega un producto de prueba
  console.log(productManager.addProduct(product));

  // Para que verifique si existe o no el codigo  
  //console.log(productManager.addProduct(product2));
  
  // Obtiene todos los productos
  console.log(productManager.getProducts());

  // Obtiene un producto por id
  console.log(productManager.getProductById(1));

// actualización de un producto
const productToUpdate = productManager.getProductById(1);
productToUpdate.price = 250;
productToUpdate.stock = 15;
productManager.updateProduct();

// eliminación de un producto
productManager.deleteProduct(2);
console.log(productManager.getProducts());