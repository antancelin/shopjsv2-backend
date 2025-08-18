require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/shopjsv2";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connecté avec succès");
    console.log(`📍 Database: ${MONGODB_URI.split("/").pop()?.split("?")[0]}`);
  })
  .catch((error) => {
    console.error("❌ Erreur de connexion MongoDB:", error.message);
    process.exit(1);
  });

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 Environnement: ${NODE_ENV}`);
  console.log(`🌐 URL locale: http://localhost:${PORT}`);
});
