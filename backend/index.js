const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hotelRouter = require('./routes/hotelRoutes')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())

mongoose
  .connect(
    "mongodb+srv://arshu123:arshu123@bezora.tm4nydu.mongodb.net/goOption"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
  

// Use the restaurantRoutes middleware
app.use('/api', hotelRouter);


app.listen(5000,'192.168.100.10',() => {
  console.log('Server is running on port 5000');
});
