import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user-routes.js";
import postRoutes from "./routes/post-routes.js";
import morgan from "morgan";
import redis from "redis";

//allow accessing variable from dotenv file
dotenv.config();


//create redis client
export const client = redis.createClient();
client.connect().then(() => console.log(`Redis is connected`)).catch((error) => console.log(`Error in connecting Redis ${error.message}`));

//create express app
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use('/', userRoutes);
app.use('/', postRoutes);


export default app;