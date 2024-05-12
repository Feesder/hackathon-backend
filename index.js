import express from 'express';
import mongoose from 'mongoose';
import tenderRouter from './router/tenderRouter.js'
import fileUpload from 'express-fileupload';
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import itemRouter from "./router/itemRouter.js";

const PORT = 8080;
const DB_URL = `mongodb+srv://yerdos:M0PRRsWxQLqmYxfW@cluster0.7woqif3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

app.use(cors({
    credentials: true,
    origin:'http://localhost:3000',
}));
app.use(cookieParser())
app.use(express.json());
app.use('/static', express.static('static'))
app.use(fileUpload({}))
app.use('/api', userRouter);
app.use('/api', tenderRouter);
app.use('/api', itemRouter);
app.use(errorMiddleware)

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('Server started on port ' + PORT))
    } catch (e) {
        console.log(e);
    }
}

startApp()

export default app;