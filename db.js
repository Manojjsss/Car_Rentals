const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://01fe22bca083:manoj123@cluster0.alfic3l.mongodb.net/Car_Rental', {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log("Mongo DB Connection Successful");
    } catch (error) {
        console.error("Mongo DB Connection Error:", error);
    }
}

module.exports = { connectDB }; 
