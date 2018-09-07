import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin';
admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send(`Hellow Word!`);
});

// SendGrid implement
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmail = functions.https.onCall((data, context) => {
    console.log('functions - https - onCall, data: ', data);
    const msg = {
        to: 'dylannnnlee@gmail.com',
        from: `${data.contactEmail}`,
        template_id: 'd-d72ecd2125354d15b5c5f12dc76e79b3',
        dynamic_template_data: {
            name: `${data.contactName}`,
            phone: `${data.contactPhone}`,
            email: `${data.contactEmail}`,
            message: `${data.contactMessage}`
        }
    };
    sgMail.send(msg).then(() => {
        console.log('Email has been send successfully via SendGrid');
        return {
            message: 'success',
            status: 200,
            feel: 'Happy'
        }
    })
    .catch(error => {
        //Log friendly error
        console.error(error.toString());
    });
  });
