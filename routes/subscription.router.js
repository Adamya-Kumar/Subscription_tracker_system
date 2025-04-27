import {Router} from 'express';
import {authorize} from "../middlewares/auth.middleware.js";
import {createSubscription, getSubscriptions} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=> res.send({title:"get all subscriptions"}));

subscriptionRouter.get('/:id',(req,res)=> res.send({title:"get subscription details"}));

//http://localhost:5500/api/v1/subscriptions/ (POST)
subscriptionRouter.post('/',authorize,createSubscription);

subscriptionRouter.put('/:id',(req,res)=> res.send({title:"update subscriptions"}));

subscriptionRouter.delete('/:id',(req,res)=> res.send({title:"delete subscriptions"}));

//http://localhost:5500/api/v1/subscriptions/user/:id (GET)
subscriptionRouter.get('/user/:id',authorize,getSubscriptions);

subscriptionRouter.put('/:id/cancel',(req,res)=> res.send({title:"cancel subscriptions"}));

subscriptionRouter.get('/upcoming-renewals',(req,res)=> res.send({title:"upcoming renewals subscriptions"}));



export default subscriptionRouter;