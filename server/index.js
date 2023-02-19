require('dotenv').config()
const connectToMongo = require('./config');
const express = require('express');
connectToMongo();
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/images', express.static('images'));
// Available Routes 
app.use('/api/users', require('./routes/users'))

app.listen(port, () => {
    console.log(`User management listening at http://localhost:${port}`)
})