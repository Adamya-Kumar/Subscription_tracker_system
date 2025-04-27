import { Client as WorkflowClient } from '@upstash/workflow';
import {QSTASH_URL,QSTASH_TOKON} from "./env.js";


export const workflowClient = new WorkflowClient({
        token:QSTASH_TOKON,
        baseUrl:QSTASH_URL
});