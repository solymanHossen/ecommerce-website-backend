import Joi from 'joi';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Define a schema for validation
const envSchema = Joi.object({
  DB_NAME: Joi.string().default('Post'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(27017),
}).unknown().required();

// Validate the environment variables
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Use the validated values
const dbName = envVars.DB_NAME;
const dbHost = envVars.DB_HOST;
const dbPort = envVars.DB_PORT;

// Construct the connection string
const connectionString = `mongodb://${dbHost}:${dbPort}/${dbName}`;


const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

//db connection
export const db = mongoose.connect(connectionString, options)
.then(res => {
    if(res){
        console.log(`Database connection succeffully to ${dbName}`)
    }
    
}).catch(err => {
    console.log(err)
})