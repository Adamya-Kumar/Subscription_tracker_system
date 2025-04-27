import {Router} from "express";
import {getUsers,getUser} from "../controllers/user.controller.js";
import {authorize} from "../middlewares/auth.middleware.js";
const usersRouter = Router();



// path: /api/v1/users/ (GET)
usersRouter.get("/", getUsers)

// path: /api/v1/users/:id (GET)
usersRouter.get("/:id",authorize, getUser)

usersRouter.post('/', (req,res) => res.send({title:"create user in db"}));

usersRouter.put("/:id",(req,res)=>res.send({title:"update user data"}))

usersRouter.delete("/:id",(req,res)=>res.send({title:"delete user data from db"}))

export default  usersRouter;