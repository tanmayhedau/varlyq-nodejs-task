import app from "./app.js";
import connectDB from "./config/conn.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running in ${process.env.DEV_MODE} at port no. ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
