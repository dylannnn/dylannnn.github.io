import * as functions from 'firebase-functions';
import { MailDataRequired, MailService } from '@sendgrid/mail';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin';
admin.initializeApp();

const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sendMail = new MailService();

sendMail.setApiKey(SENDGRID_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.sendEmail = functions.https.onCall((data, context) => {
  console.log('functions - https - onCall, data: ', data);
  const mailData: MailDataRequired = {
    to: 'dylannnnlee@gmail.com',
    from: `${data.contactEmail}`,
    templateId: 'd-d72ecd2125354d15b5c5f12dc76e79b3',
    dynamicTemplateData: {
      name: `${data.contactName}`,
      phone: `${data.contactPhone}`,
      email: `${data.contactEmail}`,
      message: `${data.contactMessage}`,
    },
  };

  sendMail.send(mailData).then(() => {
    console.log('Email has been send successfully via SendGrid');
    return {
      message: 'success',
      status: 200,
      feel: 'Happy',
    };
  }).catch((error) => {
    console.log('Email has been send with error');
    console.error(error.toString());
  });
});
