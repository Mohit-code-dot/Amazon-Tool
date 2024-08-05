const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const path = require("path");
const app = express();
const port = 4500;
const moment = require("moment");
const bodyParser = require("body-parser");
const cors = require("cors");
const imageModel = require("./mongos");
const cloudinary = require("./cloudinary");
const upload = require("./multer");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(cors());

app.use("/public",express.static(path.join(__dirname)));
app.set("view engine","ejs");

// MongoDB Connection
const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://WorkinX:JoPlgIK8JUpjMeuY@cluster0.qm9dld0.mongodb.net/WorkinX`
    )
    .then(() => {
      console.log(`Connected to MongoDB with ${mongoose.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
}; 
connectDB();
const BrandSchema = new mongoose.Schema({
  title: String,
  bulletPoint01: String,
  bulletPoint02: String,
  bulletPoint03: String,
  bulletPoint04: String,
  bulletPoint05: String,
  bulletPoint06: String,
  price: String,
  brandName: String,
  itemForm: String,
  manufacture: String,
  quantity: Number,
  PackageInfo: String,
});

const collection = new mongoose.model("BrandStore", BrandSchema);

app.get("/data", (req, res) => {
// Use the client to connect to the database
async function fetchData() {
try {
  // Replace the uri string with your MongoDB deployment's connection string.
const uri =
"mongodb+srv://WorkinX:JoPlgIK8JUpjMeuY@cluster0.qm9dld0.mongodb.net/WorkinX";
 
// Create a new MongoClient
const client = new MongoClient(uri);
 
// Define the database and collection names
const dbName = "WorkinX";
const collectionName = "brandstores"; 
  await client.connect(); 
  console.log("Connected to MongoDB"); 

  // Get the database and collection
  const db = client.db(dbName);
  const collectionDB = db.collection(collectionName);
  
  // Find data in the collection 
  const docs = await collectionDB.find().toArray();

  console.log("Data fetched from MongoDB:");


} catch (err) {
  console.error(err);
} finally { 
  // Close the client
  await client.close();
}
} 
fetchData();
});

app.post("/post", async (req, res) => {
  const {
    title,
    bulletPoint01, 
    bulletPoint02,
    bulletPoint03,
    bulletPoint04,
    bulletPoint05,
    bulletPoint06,
    price,
    brandName,
    itemForm,
    manufacture,
    quantity,
    PackageInfo,
  } = req.body;

  const user = new collection({
    title,
    bulletPoint01,
    bulletPoint02,
    bulletPoint03,
    bulletPoint04,
    bulletPoint05,
    bulletPoint06,
    price,
    brandName,
    itemForm,
    manufacture,
    quantity,
    PackageInfo,
  });
  await user.save();
  res.send("SuccessFull");
});

app.post("/uploadImage", async (req, res) => {
  const image = req.body;

  try {
    const userdata = new imageModel({
      imgpath: image,
    });
    console.log(userdata);
    await userdata.save();
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json(error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
