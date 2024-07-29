import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors"
import CoursesRoutes from "./Kanbas/Courses/routes.js"
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import UserRoutes from "./User/routes.js";
import session from "express-session";
import "dotenv/config";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
const app = express()
app.use( cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") { //not gonna happen since the setting in .env
  sessionOptions.proxy = true; //Setting proxy to true indicates that the application is behind a reverse proxy (such as Nginx, AWS ELB). This is important for handling secure 
  //connections correctly when the application is behind such infrastructure.
  sessionOptions.cookie = {
    sameSite: "none", //This attribute allows cookies to be sent with cross-origin requests, which is necessary 
    //for applications that need to share cookies across different domains.
    secure: true, //This ensures that cookies are only sent over HTTPS connections, which is critical for protecting sensitive 
    //data like session tokens from being transmitted over unencrypted connections.
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(
  session(sessionOptions)
);
  
app.use(express.json());
UserRoutes(app);
Hello(app)
Lab5(app)
CoursesRoutes(app)
ModuleRoutes(app);
AssignmentRoutes(app);
app.listen(process.env.PORT || 4000)