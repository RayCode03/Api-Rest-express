const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

let product = [
  { name: "iPhone X", price: 70000, id: 1 },
  { name: "Samsung S10", price: 60000, id: 2 },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.json(product);
});

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: product.length + 1 };
  product.push(newProduct);
  res.send(newProduct);
});

app.put("/products/:id", (req, res) => {
  console.log(req.params.id);

  //const newData = req.body;

  const prodectFount = product.find(function (product) {
    return product.id === Number(req.params.id);
  });

  if (!prodectFount) {
    return res.status(404).json({ message: "Product not found" });
  }

  product = product.map((product) => {
    if (product.id === Number(req.params.id)) {
      return { ...product, ...req.body };
    }
    return product;
  });

  res.status(200).json(product);
});

app.delete("/products/:id", (req, res) => {
  console.log(req.params.id);
  const prodectFount = product.find(function (product) {
    return product.id === Number(req.params.id);
  });

  if (!prodectFount) {
    return res.status(404).json({ message: "Product not found" });
  }

  product = product.filter((p) => p.id !== parseInt(req.params.id));

  res.status(204).json({ message: "Product deleted" });
});

app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
  const prodectFount = product.find(function (product) {
    return product.id === Number(req.params.id);
  });

  if (!prodectFount) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(prodectFount);
});

app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
