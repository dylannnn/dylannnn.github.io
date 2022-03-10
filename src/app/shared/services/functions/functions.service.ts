import { Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private readonly functions: Functions) { }

  sendEmail(): (data?: unknown) => Observable<unknown> {
    return httpsCallableData(this.functions, 'sendEmail', { timeout: 3_000 });
  }
}
