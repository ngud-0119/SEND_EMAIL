// filename: index.js
// Creating an endpoint for sending customized emails
app.post('/custom-email',(req, res)=>{
  let config = {
      service: 'gmail',
      auth: {
          user: process.env.NODEJS_GMAIL_APP_USER,
          pass: process.env.NODEJS_GMAIL_APP_PASSWORD
      }
  }
  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
          name: 'YOUR_PRODUCT_NAME',
          link: 'https://mailgen.js/'
      }
  });

  let response = {
      body: {
          name: 'Name',
          intro: 'Welcome to ABC Company! We\'re very excited to have you on board.',
          action: {
              instructions: 'To get started with ABC, please click here:',
              button: {
                  color: '#22BC66', // Optional action button color
                  text: 'Confirm your account',
                  link: 'https://mailgen.js/'
              }
          }
      }
  };

  let mail = MailGenerator.generate(response);

  let message = {
      from: 'ibrahimhz@gmail.com',
      to: req.body.email,
      subject: 'Welcome to ABC company!',
      html: mail,
      attachments: [
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