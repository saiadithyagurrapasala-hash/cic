import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct,
  createProductForm,
} from "./controllers/productController.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 9500;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection middleware - guarantees DB is connected before any route handler runs
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// CRUD operations for products
// Route to render the product form for adding a new product
app.get("/product-form", createProductForm);
// Route to handle adding a new product
app.post("/add-product", createProduct);

// Route to display all products
app.get("/", readProducts);
// Route to display a single product
app.get("/product/:id", readProductById);

// Route to render the product form for editing an existing product
app.get("/product-form/:id", updateProductForm);
// Route to handle updating an existing product
app.post("/add-product/:id", updateProduct);

// Route to handle deleting a product
app.get("/delete-product/:id", deleteProduct);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Application error:", err);
  res.status(err.status || 500).render("error", { error: err.message || "Internal Server Error" });
});

// Start local server if not running in Vercel serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export default app;
