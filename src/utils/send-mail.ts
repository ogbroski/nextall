"use server";

const nodemailer = require("nodemailer");

interface sendMailProps {
   email: string;
   subjectLine: string;
   content: string;
}

export const sendEmail = async ({email,subjectLine,content}: sendMailProps) => {
   try {
       const transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: "farmilkibrodilki@gmail.com",
               pass: process.env.NODEMAILER_APP_PASSWORD,
           },
       });

       const mailResponse = await transporter.sendMail({
           from: 'Портал вакансий',
           to: email,
           subject: subjectLine,
           html: content,
       });
       return {
           success: true,
           message: "Сообщение успешно отправлено",
       };
   } catch (error: any) {
       return {
           success: false,
           message: error.message,
       };
   }
};