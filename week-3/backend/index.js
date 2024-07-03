const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const boardRoute = require('./routes/boardRoute');
const columnRoute = require('./routes/columnRoute');
const cardRoute = require('./routes/cardRoute');
dotenv.config();
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

app.use(cors());
app.use(cookieParser())
app.use(express.json());  

app.get("/", (req, res) => res.send("Express on Vercel"));

mongoose.connect(process.env.MONGO_URL).then( () =>{
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

app.use('/v1/board', boardRoute);
app.use('/v1/user', userRoute);
app.use('/v1/auth', authRoute);
app.use('/v1/column', columnRoute);
app.use("/v1/card", cardRoute);