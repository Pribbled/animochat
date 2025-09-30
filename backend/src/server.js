import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoute.js";
import uploadRoutes from "./routes/uploadRoute.js"

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/test", testRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/uploads', express.static('uploads'));
app.use('/api/test-uploads', express.static('test-uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
