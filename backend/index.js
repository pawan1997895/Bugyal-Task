const express = require("express")
const app = express();
const bodyParser = require('body-parser')

require('dotenv').config()
const cors = require('cors');
const PORT = process.env.PORT || 8080
require('./Models/db')
const ProductRouter = require('./Routes/ProductRoutes')

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Product server is running');
})

app.use('/api/product', ProductRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})