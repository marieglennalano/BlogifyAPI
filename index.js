//[SECTION] Dependencies and Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


//[SECTION] Routes
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');


//[SECTION] Environment Setup
require('dotenv').config();


//[SECTION] Server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Allow all resources
//app.use(cors());

const corsOptions = {
    //to be updated when we connect this to our client
    origin: ['http://localhost:3000', 'http://localhost:4000', 'https://blogify-sigma-seven.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));


//[SECTION] Database Setup
mongoose.connect(process.env.MONGODB_STRING)

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

//[SECTION] Backend Routes
app.use("/users", userRoutes);
app.use('/blogs', blogRoutes);
app.use("/comments", commentRoutes);

//[SECTION] Server Gateway Response

if(require.main === module) {
    app.listen( process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`);
    })
}


module.exports = { app, mongoose };
