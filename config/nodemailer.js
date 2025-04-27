import nodemailer from 'nodemailer';
import {NODEMAILER_PASSWORD} from "./env.js";

export const accountEmail = 't7310839922@gmail.com';

 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: NODEMAILER_PASSWORD,
    },
})

export default transporter;