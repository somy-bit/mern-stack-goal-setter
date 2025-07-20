const express = require('express');
const nodemon = require('nodemon');
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)

app.use('/api/goals', require('./routes/goalRoutes'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

