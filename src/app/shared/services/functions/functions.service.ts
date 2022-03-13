import { Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { FirebaseFunctionsResponse } from 'functions/src/firebase-functions-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private readonly functions: Functions) { }

  sendEmail(): (data?: unknown) => Observable<FirebaseFunctionsResponse> {
    return httpsCallableData(this.functions, 'sendEmail', { timeout: 3_000 });
  }
}
