const Mongoose = require("mongoose")
const localDB = 'mongodb+srv://ahmed:ahmed@cluster0.lfkxt.mongodb.net/role_auth?retryWrites=true&w=majority'
//`mongodb://localhost:27017/role_auth`
const connectDB = async () => {
await Mongoose.connect(localDB, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
console.log("MongoDB Connected")
}
module.exports = connectDB