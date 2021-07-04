import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { FirebaseFunctionsResponse } from 'functions/src/firebase-functions-response';
import { IContactForm } from 'src/app/core/models/contact-form.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFunctionAPIs {
  constructor(private fns: AngularFireFunctions) {}

  get sendEmail(): (data: IContactForm) => Observable<FirebaseFunctionsResponse> {
    return this.fns.httpsCallable('sendEmail');
  }
};
