import mongoose from "mongoose";

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB"); 
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message || error);
    }
};

export default connectdb;
