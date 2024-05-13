const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbConnection=require("./db");
app.use(express.json())

// Importing connectDB function
const { connectDB } = require("./db"); 

app.use('/api/cars/', require('./routes/carsRoute'));
app.use('/api/users/', require('./routes/usersRoute'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));
app.get('/', (req, res) => res.send("Hello World!"));

// Call the connectDB function
connectDB();

// Start the server 
app.listen(port, () => console.log(`Node JS Server Started in port ${port}`)); 
