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



dotenv.config();
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

app.use(cors());
app.use(cookieParser())
app.use(express.json());  


mongoose.connect(process.env.MONGO_URL).then( () =>{
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
