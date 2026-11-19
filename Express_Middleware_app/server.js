import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Application level middleware
// 4. Third party middleware
app.use(cors());
app.use(morgan("dev"));

// 2. Built-in middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// Custom middleware
const logPath = process.env.VERCEL ? path.join("/tmp", "server.log") : path.join(__dirname, "server.log");
const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `${req.method} ${req.url} ${res.statusCode} - ${duration}ms\n`;

    fs.appendFile(logPath, log, (err) => {
      if (err) {
        console.error("Error writing log:", err);
      }
    });
  });

  next();
};

app.use(logger);

// Validation middleware
const validate = (req, res, next) => {
  if (!req.body) {
    const err = new Error("Patient details are missing");
    err.statusCode = 400;
    throw err;
  }

  const { name, gender, ward } = req.body;
  if (!name || !gender || !ward) {
    const err = new Error("Patient details are missing");
    err.statusCode = 400;
    throw err;
  }

  next();
};

// CRUD

// Create POST http://localhost:6500/api/v1/patients
// Payload : { name, gender, ward }
app.post("/api/v1/patients", validate, (req, res) => {
  res.status(201).send("Patient added successfully");
});

// Read http://localhost:6500/api/v1/patients (all patients)
// Read http://localhost:6500/api/v1/patients?ward=ICU
app.get("/api/v1/patients", (req, res) => {
  const { ward } = req.query;

  if (ward) {
    return res.status(200).send(`Patients of ${ward} ward fetched successfully`);
  }

  res.status(200).send("All patients fetched successfully");
});

// Read http://localhost:6500/api/v1/patients/:id
app.get("/api/v1/patients/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send(`Patient with ID ${id} fetched successfully`);
});

// Update HTTP: //localhost:6500/api/v1/patients/:id
// Payload : { name, gender, ward }
app.put("/api/v1/patients/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send(`Patient with ID ${id} updated successfully`);
});

// Delete HTTP: //localhost:6500/api/v1/patients/:id
app.delete("/api/v1/patients/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send(`Patient with ID ${id} deleted successfully`);
});

// 6. 404 Middleware
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// 5. Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({ error: message });
});

// Start Server
const PORT = process.env.PORT || 6500;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;