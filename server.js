require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express')
const userRoutes = require('./src/users/router/user.routes');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: 'http://localhost:3000'
}));

app.use('/api/v1', userRoutes);



app.listen(PORT, () => console.log(`app listening on port ${PORT}`))


//add data generation functionallity