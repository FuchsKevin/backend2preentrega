// src/config/config.js
import dotenv from 'dotenv';

dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI); 

export const configObject = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || 'default_secret' 
};


console.log("MONGO_URI cargado:", configObject.mongoUri); //