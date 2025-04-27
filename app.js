import express from "express";
import {PORT} from "./config/env.js"
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/users.router.js";
import subscriptionRouter from "./routes/subscription.router.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import WorkflowRouter from "./routes/workflow.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/subscriptions",subscriptionRouter)
app.use("/api/v1/workflows",WorkflowRouter)

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("<h1>Home page of subcription tracking API</h1>");
})

app.listen(PORT,async()=>{
    console.log(`Server started on port http://localhost:${PORT}/`);
    //call to connect db
    await connectToDatabase();
});


export default app;