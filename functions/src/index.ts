// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as functions from 'firebase-functions';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import * as admin from 'firebase-admin';
import {
  FirebaseFunctionsResponse,
  RESPONSE_STATUS_CODE,
} from '../../shared/models/firebase-functions-response';
import { FirebaseRegion } from '../../shared/configurations/firebase-regions';
import { ResponseConstents } from '../../shared/constents/response-constents';
import { IContactForm } from '../../src/app/core/models/contact-form.interface';

const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sendMail = new MailService();

admin.initializeApp();
sendMail.setApiKey(SENDGRID_API_KEY);

const service = functions.region(FirebaseRegion);

exports.sendEmail = service.https
    .onCall(async (data: IContactForm, context) => {
      console.log('functions - https - onCall, data: ', data);
      const mailData: MailDataRequired = {
        to: 'dylannnnlee@gmail.com',
        from: `${data.email}`,
        templateId: 'd-d72ecd2125354d15b5c5f12dc76e79b3',
        dynamicTemplateData: {
          ...data,
        },
      };

      try {
        await sendMail.send(mailData);
        console.log('Email has been send successfully via SendGrid');
        return new FirebaseFunctionsResponse(
            ResponseConstents.MESSAGE_SUCCESS,
            RESPONSE_STATUS_CODE.OK,
            ResponseConstents.DETAILES_SUCCESS
        );
      } catch (error) {
        console.log('Email has been send with error');
        console.error(error.toString());
        return new FirebaseFunctionsResponse(
            ResponseConstents.MESSAGE_FAILED,
            RESPONSE_STATUS_CODE.SERVICE_ERROR,
            ResponseConstents.DETAILES_FAILED
        );
      }
    });
