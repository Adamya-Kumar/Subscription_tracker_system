import {createRequire} from 'module';
import Subscription from "../models/subscription.model.js";
const require = createRequire(import.meta.url);
const {serve}=require('@upstash/workflow/express');
import dayjs from "dayjs";
import {sendReminderEmail} from "../utils/send-email.js";

const REMINDER = [7,5,2,1];

export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);

    if(!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stoping workflow`)
        return;
    }

    for (const daybefore of REMINDER){
            const reminderDate = renewalDate.subtract(daybefore,'day');
            if(reminderDate.isAfter(dayjs())){
       await sleepUnitReminder(context,`${daybefore} days before reminder`,reminderDate);
            }
        if (dayjs().isSame(reminderDate, 'day')) {
            await triggerReminder(context, `${daybefore} days before reminder`, subscription);
        }
    }
});

const fetchSubscription = async (context,subscriptionId) => {
    return await context.run('getSubscription',async()=>{
      const Sub =await Subscription.findById(subscriptionId).populate('user','name email');
         return Sub;
    });
}


const sleepUnitReminder =async (context,label,date)=>{
    console.log(`Sleep unit ${label} at ${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggerReminder = async (context,label,subscription)=>{
    return await context.run(label,()=>{
        console.log(`Triggering ${label} reminder`);
        sendReminderEmail({
            to:subscription.user.email,
            type:label,
            subscription,
        })
    });
}