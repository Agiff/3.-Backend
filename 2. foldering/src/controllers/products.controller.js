import axios from 'axios';

class ProductController {

  // Ver 1 (Fetch)
  getProducts = async (req, res) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) throw new Error('Something went wrong');

      const products = await response.json();

      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error.message);
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

      if (!productFound) throw { message: 'Product not found' }

      res.status(200).send(productFound);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export const productController = new ProductController();