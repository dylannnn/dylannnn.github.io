import { Injectable } from '@angular/core';
import { FirebaseFunctionsResponse } from 'shared/models/firebase-functions-response';
import { Observable } from 'rxjs';
import { FirebaseFunctionAPIs } from 'src/app/core/services/firebase-functions-api.service';
import { IContactForm } from '../models/contact-form.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFunctionService {
  constructor(private api: FirebaseFunctionAPIs) {}

  sendEmail(data: IContactForm): Observable<FirebaseFunctionsResponse> {
    return this.api.sendEmail(data);
  }
}
