const fs = require('fs');
class ProductManager {
    constructor() {
      this.path = 'productos.json';
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
        if (!productFound){
          throw new Error("Product not found");
        }
          return productFound;
      }
      catch{error}{
        throw new Error (error.message);
      }  
    }


    // llamo al método updateProduct que actualiza los productos en el archivo JSON
    async updateProduct(id, newData) {
      let data = await this.getProducts();
      const position = data.findIdex((product) => product.id === id)
      if (position !== -1){
        data[position] = {... data[position]}, newData;
        const productString = JSON.stringify(data, null, 2)
      await  fs.promises.writeFileSync('productos.json', productString)
      return "product updated successfully"
      }
    }

    deleteProduct(id) {
      this.products = this.products.filter((product) => product.id !== id);
      fs.writeFileSync("productos.json", JSON.stringify(this.products, null, 2));
    }
}
  // Crea dos objetos de prueba
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
}
  //  asyncFn();
module.exports = ProductManager;