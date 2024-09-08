import mongoose from "mongoose";

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("connected to mongodb"); 

    }catch (error) {
        console.log("Error connecting to Mongodb",error.messages)

    }
}

export default connectdb;