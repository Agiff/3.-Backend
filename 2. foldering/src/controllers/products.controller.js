import axios from 'axios';

class ProductController {

  // Ver 1 (Fetch)
  getProducts = async (req, res) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) throw new Error('Something went wrong');

      const products = await response.json();

      res.send(products);
    } catch (error) {
      res.send(error);
    }
  }

  // Ver 2 (Axios)
  findProduct = async (req, res) => {
    try {
      const { id } = req.params;

      // Ver 1
      // const response = await axios.get('https://fakestoreapi.com/products'); 
      // res.send(response.data);

      // Ver 2
      // const { data } = await axios.get('https://fakestoreapi.com/products');
      const { data: products } = await axios.get('https://fakestoreapi.com/products'); // Giving name to const data

      const productFound = products.find((product) => product.id === +id);

      if (!productFound) throw new Error('Product not found');

      res.send(productFound);
    } catch (error) {
      res.send(error);
    }
  }
}

export const productController = new ProductController();