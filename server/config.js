const mongoose = require('mongoose');
const connectToMongo = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.mongoURI, () => {
        console.log("connected to Mongo Successfully");
    })
}
// console.log("11 ",process.env.mongoURI)
module.exports = connectToMongo;