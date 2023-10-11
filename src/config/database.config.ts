import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = 'mongodb://admin:root@localhost:27017/parkit?authSource=admin';
    await mongoose.connect(uri);
    console.log('MongoDb Connected');
}
