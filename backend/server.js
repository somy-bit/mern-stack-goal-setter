const express = require('express');

const dotenv = require('dotenv').config()
const colors = require('colors');
const connectDB = require('./config/db');
const path =  require('path')



const PORT = process.env.PORT || 5000;
connectDB()
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));







app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

