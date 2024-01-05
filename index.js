// filename: index.js

const express = require('express');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();
const app = express();
const port = 3001;

app.use(express.json());

app.post('/email',(req, res)=>{
    let config = {
        service: 'gmail', // your email domain
        auth: {
            user: process.env.NODEJS_GMAIL_APP_USER,   // your email address
            pass: process.env.NODEJS_GMAIL_APP_PASSWORD // your password
        }
    }
    let transporter = nodemailer.createTransport(config);

    let message = {
        from: 'ibrahimhz@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Welcome to ABC Website!', // Subject line
        html: "<b>Hello world?</b>", // html body
        attachments: [ // use URL as an attachment
            {
              filename: 'cat image',
              path: '<link of the document>',
              cid: 'unique cat image id' 
            }
        ]
    };

    transporter.sendMail(message).then((info) => {
        return res.status(201).json(
            {
                msg: "Email sent",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            }
        )
    }).catch((err) => {
        return res.status(500).json({ msg: err });
    }
    );
})