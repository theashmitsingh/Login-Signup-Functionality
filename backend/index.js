const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const database = require('./config/database');
database.connect();
const cors = require("cors");
const userRoutes = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');

app.use(express.json());
app.use(cors());
app.use('/api/v1', userRoutes);
app.use('/api/v1/products', productRouter);

app.get("/", (req, res) => {
    res.send("Working!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})