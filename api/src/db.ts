import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.ifpqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log('>>> DB is connected')
  } catch (err) {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
  }
}
