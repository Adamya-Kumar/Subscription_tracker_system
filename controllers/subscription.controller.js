import Subscription from '../models/subscription.model.js';
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";
export const createSubscription = async(req,res,next)=>{
       const URL=`${SERVER_URL}/api/v1/workflows/subscription/reminder`

   try {
       const subscription = await Subscription.create({
          ...req.body,
           user:req.user._id,
       })

   const workflowResponse = await workflowClient.trigger({
           url:URL,
           body:{
               subscriptionId:subscription.id,
           },
           headers:{
               'content-type':'application/json',
           },
           retries:0,
       })

       res.status(201).json({
           success:true,
           message:"Subscription created successfully",
           data:{
               subscription:subscription,
               workflowId:workflowResponse.workflowRunId,

           }
       })
   }catch (error) {
       next(error);
   }
};


export const getSubscriptions = async(req,res,next)=>{
    try {
        if(req.user._id != req.params.id){
            const error = new Error("You are not authorized to view this resource");
            error.statusCode = 403;
            throw error;
        }
        const subscription = await Subscription.find({user:req.params.id})
        res.status(200).json({
            success:true,
            data:{
                subscription:subscription,
            }
        })

    }catch (error) {
        next(error);
    }
}