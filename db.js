import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default {
    connect() {
        mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME });
    }
}