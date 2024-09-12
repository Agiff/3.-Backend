import "dotenv/config";
import express from "express";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Javascript Developer Class');
})

app.get('/greeting', (req, res) => {
  res.send('Hello World');
})

/*
  Query
*/

// Ver 1
app.get('/users', (req, res) => {
  const users = [
    {
      email: "test@mail.com",
      password: "asd",
      firstName: "John",
      lastName: "Doe",
      age: 29,
      hobby: "Reading",
      address: {
        street: "123 Maple Street",
        city: "Springfield",
        state: "IL",
        zip: "62704"
      }
    },
    {
      email: "jane.smith@example.com",
      password: "MyPassword@2024",
      firstName: "Jane",
      lastName: "Smith",
      age: 34,
      hobby: "Hiking",
      address: {
        street: "456 Oak Avenue",
        city: "Austin",
        state: "TX",
        zip: "73301"
      }
    }
  ]

  const userQuery = req.query;
  console.log(userQuery.userId);
  console.log(userQuery.firstName);

  res.send(users);
})

// Ver 2 (Destructure)
app.get('/products', (req, res) => {
  const products = [
    {
      "id": 1,
      "title": "Laptop",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    },
    {
      "id": 2,
      "title": "T-Shirts",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      "rating": {
        "rate": 4.1,
        "count": 259
      }
    }
  ]

  const { productId, productName } = req.query;
  
  let productFound;

  productFound = products.find((product) => product.id === +productId);
  if (!productFound) productFound = products.find((product) => product.title === productName);

  res.send(productFound);
})

/*
  Params
*/

app.get('/products/:id', (req, res) => {
  const products = [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      "rating": {
        "rate": 4.1,
        "count": 259
      }
    }
  ]

  const { id } = req.params;
  
  const productFound = products.find((product) => product.id === +id);
  console.log(productFound);

  res.send(productFound);
})

/*
  Header
*/

app.get('/dashboard', (req, res) => {
  console.log(req.headers);

  res.send(req.headers);
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});