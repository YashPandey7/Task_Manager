const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = new express();
const taskRoutes = require("./routes/task.routes");
require('dotenv').config();

// const taskModel = require("./models/task.model");
// console.log(taskModel);

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

// const PORT = 8082;
// const Mongo_URL = "mongodb://127.0.0.1:27017/task-manager";
const PORT = process.env.PORT  || 10000;
const Mongo_URL = process.env.MongoDB_URL;

mongoose.connect(Mongo_URL
    // ,{useNewUrlParser : true,
    // useUnifiedTopology : true,}
).then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("Error in connecting with DB, ", err));

app.listen(PORT, () => {
    console.log(`Backend is running on Port : ${PORT}`);
});