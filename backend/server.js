const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


require('dotenv').config();

const app = express();

//Parse the cookies
app.use(cookieParser());

const port = process.env.PORT ||5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open',() => {
   console.log("MongoFB database connection established successfully");
});



const userRoute = require('./routes/users');
//We use the middleware to check for any request on user that only the right user is allow to access

app.use('/users',userRoute);

app.listen(port,() => {
    console.log(`Server is running on port: ${port}`);
});

//Start the server using "nodemon server"
