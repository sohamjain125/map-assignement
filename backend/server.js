const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DB_URL);

const AddressSchema = new mongoose.Schema({
  house: String,
  area: String,
  category: String,
  location: { lat: Number, lng: Number },
  favorite: Boolean,
});

const Address = mongoose.model("Address", AddressSchema);

// API Routes
app.post("/addresses", async (req, res) => {
  const address = new Address(req.body);
  await address.save();
  res.status(200).send("Address saved successfully");
});

app.get("/addresses", async (req, res) => {
  const addresses = await Address.find();
  res.json(addresses);
});

app.delete("/addresses/:id", async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);
  res.status(200).send("Address deleted successfully");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
