const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const path = require("path");
const fs = require("fs");
const { BlobServiceClient } = require("@azure/storage-blob");
const { Readable } = require("stream");
const axios = require("axios");

var mongoose = require("mongoose");
const { log } = require("console");
mongoose.set("strictQuery", true);
var url = "mongodb://172.17.4.11:27017/epaper";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));
mongoose.Promise = global.Promise;

/*const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const url = 'mongodb+srv://Vetrikodi:Vetrikodi%401@vetrikodi.duvuxkj.mongodb.net/epaper?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));*/

// Today date
const today = new Date();
const date = today.setDate(today.getDate());
const defaultValue = new Date(date).toISOString().split("T")[0];
console.log(defaultValue);
const defaultPages = "Front";

const app = express();
const port = 3300;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use(
//     cors({
//       origin: "http://192.168.90.131:3000",
//     })
//   );

app.get("/hello", (req, res) => {
  res.send("welcome to my webpage");
});

app.get("/fetchnews", (req, res) => {
  const { date } = req.query;
  const currentDate = date || new Date().toISOString().slice(0, 10);

  mongoose.connect(url, function (err, db) {
    if (err) throw err;
    // db.collection("vetrikodi").find({}).toArray(function (err, result) {
    db.collection("vetrikodi")
      .find({ Date: currentDate, Pagename: defaultPages })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(err);
        res.send(result);
        console.log(result);
        mongoose.disconnect();
      });
  });
});

app.get("/fetchnews/:Pages", (req, res) => {
  const { Pages } = req.params || defaultPages;
  console.log(Pages);
  const currentDate = date || new Date().toISOString().slice(0, 10);

  mongoose.connect(url, function (err, db) {
    if (err) throw err;

    db.collection("vetrikodi")
      .find({ Date: currentDate, Pagename: Pages })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(err);
        res.send(result);
        console.log(result);
        mongoose.disconnect();
      });
  });
});

app.post("/postnews", (req, res) => {
  const date = req.body.Date;
  console.log(date);
  mongoose.connect(url, function (err, db) {
    if (err) throw err;
    db.collection("vetrikodi")
      .find({ Date: date, Pagename: defaultPages })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(err);
        res.send(
          JSON.stringify({ status: 200, error: null, response: result })
        );
        console.log(result);
        mongoose.disconnect();
      });
  });
});

const ObjectId = require("mongodb").ObjectId;

app.post("/news/id", (req, res) => {
  const Id = req.body.id;
  console.log(Id);
  mongoose.connect(url, function (err, db) {
    if (err) throw err;
    // db.collection("vetrikodi").findOne({ _id: ObjectId(Id) },function (err, result) {
    db.collection("vetrikodi")
      .find({ _id: ObjectId(Id) })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(err);
        res.send(
          JSON.stringify({ status: 200, error: null, response: result })
        );
        console.log(result);
        mongoose.disconnect();
      });
  });
});

app.get("/news/share", (req, res) => {
  const { Id } = req.query.Id;
  console.log(Id);
  mongoose.connect(url, function (err, db) {
    if (err) throw err;
    db.collection("vetrikodi")
      .find({ _id: ObjectId(Id) })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(err);
        res.send(
          JSON.stringify({ status: 200, error: null, response: result })
        );
        console.log(result);
        mongoose.disconnect();
      });
  });
});

app.post("/pagenews", (req, res) => {
  const date = req.body.Date;
  const pagename = req.body.Pagename;
  console.log(date);
  mongoose.connect(url, function (err, db) {
    if (err) throw err;
    db.collection("vetrikodi")
      .find({ Date: date || defaultValue, Pagename: pagename })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(err);
        res.send(
          JSON.stringify({ status: 200, error: null, response: result })
        );
        console.log(result);
        mongoose.disconnect();
      });
  });
});

// // Serve static files from the public directory
// app.use(express.static(path.join(__dirname,"/public")));

// app.get('/api/pdf', (req, res) => {
//     const { date } = req.query;
//     console.log(date)

//     // Construct the path to the PDF file based on the requested date
//     const pdfPath = path.join(__dirname,'/pdfs',`${date}.pdf`);

//     // Check if the file exists
//     fs.access(pdfPath, fs.constants.F_OK, (err) => {
//         if (err) {
//             console.error(err);
//             res.status(404).send('PDF file not found');
//         } else {
//             // Set the response headers to indicate that this is a PDF file
//             res.setHeader('Content-Type', 'application/pdf');
//             res.setHeader('Content-Disposition', `inline; filename="${date}.pdf"`);
//             // Stream the PDF file to the client
//             fs.createReadStream(pdfPath).pipe(res);
//         }
//     });
// });

const AZURE_STORAGE_CONNECTION_STRING =
  "DefaultEndpointsProtocol=https;AccountName=stgvetrikkodi;AccountKey=27a7H6pU07/ZAELoG3YqUe3YjExOwQi8LQ5F11Pu8ZzGD9An1mC4HnfU+dgnxGAstDbIuLUH3i14+AStlx9XGg==;EndpointSuffix=core.windows.net";

app.get("/api/pdf", async (req, res) => {
  const { date } = req.query;
  console.log(date);

  try {
    // Create a BlobServiceClient object using the connection string
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    console.log("Azure Blob storage connection successfully");

    // Get a reference to the container where the PDF files are stored
    const containerClient = blobServiceClient.getContainerClient("vetrikkodi");

    // Construct the name of the PDF file based on the requested date
    const subfolderName = "pdf";
    const pdfName = `${subfolderName}/${date}.pdf`;

    // Get a reference to the PDF file
    const blockBlobClient = containerClient.getBlockBlobClient(pdfName);

    // Check if the file exists
    const exists = await blockBlobClient.exists();
    if (!exists) {
      res.status(404).send("PDF file not found");
      return;
    }

    // Set the response headers to indicate that this is a PDF file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${pdfName}"`);

    // Stream the PDF file to the client
    const downloadResponse = await blockBlobClient.download();
    const readableStream = downloadResponse.readableStreamBody;
    readableStream.pipe(res);
  } catch (error) {
    console.error("Azure Blob storage connection failed:", error);
    //res.status(500).send("Error retrieving PDF file");
  }
});



app.get("/status/filename", async (req, res) => {
  try {
    const containerName = "vetrikkodi";
    const folderName = "Test/";
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // List blobs in the specific folder
    const blobs = [];
    for await (const blob of containerClient.listBlobsByHierarchy("/", {
      prefix: folderName,
    })) {
      blobs.push(blob.name);
    }
    res.json({ files: blobs });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

const pool = mysql.createPool({
  user: "root",
  database: "quizdata",
  password: "VetriKodi#1",
  connectionLimit: 180,
});
pool
.getConnection()
.then((connection) => {
  console.log("Successfully connected to MySQL database!");
  connection.release();
})
.catch((error) => {
  console.error("Error connecting to MySQL database:", error.message);
});

// export the pool object so other modules can use it

module.exports = pool;


// Testing API
app.get("/hi", (req, res) => {
  res.send("welcome to my page");
});

//APi to fetch users name and id from DB
app.get("/userName", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log("mysql connected sucessfully");
    const [rows, fields] = await connection.query(
      "SELECT DISTINCT userid ,name FROM userstable"
    );
    connection.release();
    res.json({ rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching name from the database");
  }
});

//APi to fetch all user details from DB
app.get("/allUserInfo", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log("mysql connected sucessfully");
    const [rows, fields] = await connection.query("SELECT * FROM userstable");
    connection.release();
    res.json({ rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching name from the database");
  }
});

//Api to insert user details from Quintype to our DB
app.post("/insertqProfile", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.email;
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      `INSERT INTO userqtable(id,name,emailid,username) VALUES (?,?,?,?)`,
      [id, name, email, username]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating the profile");
  }
});

//Api to get data of users info which is stored in our db from Quinty 
app.post("/getqdata", async (req, res) => {
  const id = req.body.id;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT * FROM userqtable WHERE id=?",
      [id]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching topics from the database");
  }
});

//Api to insert user info into our DB from registeration form
app.post("/insertProfile", async (req, res) => {
  const userid = req.body.id;
  console.log(userid);
  const name = req.body.name;
  const dob = req.body.dob;
  const emailid = req.body.emailid;
  const level = req.body.level;
  const levelid = req.body.levelid;
  const gender = req.body.gender;
  const school = req.body.school;
  const country = req.body.country;
  const state = req.body.state;
  const city = req.body.city;
  const pincode = req.body.pincode;
  const phone = req.body.phone;
  const accounttype = req.body.accounttype;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      `INSERT INTO userstable (userid,name,dob,email,level,levelid,gender,school,country,state,city,pincode,phone,accounttype) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        userid,
        name,
        dob,
        emailid,
        level,
        levelid,
        gender,
        school,
        country,
        state,
        city,
        pincode,
        phone,
        accounttype,
      ]
    );
    console.log("inserted sucessfully");
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating the profile");
  }
});

//Api to fetch users id from userqtable
app.get("/Quserinfo", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log("mysql connected sucessfully");
    const [rows, fields] = await connection.query(
      "SELECT DISTINCT id FROM userqtable"
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching name from the database");
  }
});

//Api to fetch categories from quizfulldata DB
app.post("/categories", async (req, res) => {
  const level = req.body.level;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT DISTINCT category FROM quizfullcontent WHERE level=?",
      [level]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching topics from the database");
  }
});

//Api to fetch to levels from quizfulldata db
app.get("/levels", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT DISTINCT level FROM quizfullcontent"
    );
    connection.release();
    res.json({ levels: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching levels from the database");
  }
});

//Api to fetch topic, category and topic id from quizfulldata using category and level
app.post("/topic", async (req, res) => {
  const category = req.body.category;
  const level = req.body.level;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT DISTINCT topic,category, topicid FROM quizfullcontent WHERE category=? AND level=?",
      [category, level]
    );

    // "SELECT DISTINCT topic,category, topicid FROM quizfullcontent WHERE category=? AND level=?",//

    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching topics from the database");
  }
});


app.post("/topic/topicid", async (req, res) => {
  const userId = req.body.userid;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT * FROM result WHERE userid=?",
      [userId]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching topics from the database");
  }
});

app.post("/Profile", async (req, res) => {
  const userId = req.body.userid;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT * FROM userstable WHERE userid=?",
      [userId]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching topics from the database");
  }
});

app.post("/questions", async (req, res) => {
  const category = req.body.category;
  const level = req.body.level;
  const topic = req.body.topic;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT * FROM quizfullcontent WHERE category=? AND level=? AND topic=?",
      [category, level, topic]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching questions from the database");
  }
});

app.post("/dailyquestions", async (req, res) => {
  const level = req.body.level;
  const userid = req.body.userid;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      "SELECT * FROM dailyquizdata WHERE level = ? AND user_attended != ? ORDER BY RAND() LIMIT 10",
      [level, userid]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching questions from the database");
  }
});

app.post("/result", async (req, res) => {
  const userid = req.body.userid;
  const username = req.body.username;
  const topicid = req.body.topicid;
  const mark = req.body.mark;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      `
        INSERT INTO result (userid,name, topicid, mark)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          topicid = CONCAT(topicid, ',', ?),
          mark = CONCAT(mark, ',', ?)
        `,
      [userid, username, topicid, mark, topicid, mark]
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating the result");
  }
});

app.post("/dailyresult", async (req, res) => {
  const userid = req.body.userid;
  const username = req.body.username;
  const date = req.body.date;
  const score = req.body.mark;

  try {
    // get a connection from the pool
    const connection = await pool.getConnection();

    // start a transaction
    await connection.beginTransaction();

    // prepare the SQL statement
    const statement = `
        INSERT INTO dailyquizresult (userid, name, date, score)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          score = CONCAT(score, ',', ?)
      `;
    const values = [userid, username, date, score, score];
    const [rows, fields] = await connection.query(statement, values);

    // commit the transaction
    await connection.commit();

    // release the connection back to the pool
    connection.release();

    res.json(rows);
  } catch (err) {
    console.error(err);

    // rollback the transaction if an error occurred
    if (connection) {
      await connection.rollback();
      connection.release();
    }

    res.status(500).send("Error updating the result");
  }
});

//APi to fetch all info details from result DB
app.get("/allResult", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log("mysql connected sucessfully");
    const [rows, fields] = await connection.query("SELECT * FROM result");
    connection.release();
    res.json({ rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching name from the database");
  }
});

//APi to fetch all info details from Daily result DB
app.get("/allDailyResult", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log("mysql connected sucessfully");
    const [rows, fields] = await connection.query("SELECT * FROM dailyquizresult");
    connection.release();
    res.json({ rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching name from the database");
  }
});

// // Reverse Proxy Configuration
// const proxyURL = "https://vetrikodi.madrid.quintype.io";

// app.use(
//   "/api/auth",
//   createProxyMiddleware({
//     target: proxyURL,
//     changeOrigin: true,
//   })
// );

app.use(express.static(path.join(__dirname, "/public")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, (req, res) => {
  console.log("Server is running port : " + port);
});