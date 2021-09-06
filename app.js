const express = require('express');
const app = express();
const User = require('./api/user/userRoute');
const Defect = require('./api/defect/defectRoute');
const connectDB = require('./config/dataBase');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// It avoids CORS policy errors OR you may install CORS extension to avoid erros-but it is not feasible for clients
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(cookieParser());

//for logging the end-points when they are hit: useful for debugging
const morgan = require('morgan');

//morgan middleware to log end-point hits
app.use(morgan('dev'));

//connect to the database
connectDB();

//for parsing json
app.use(express.json());

//api endpoints
app.use('/user', User);
app.use('/defect', Defect);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});