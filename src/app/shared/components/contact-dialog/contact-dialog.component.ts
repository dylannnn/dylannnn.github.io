import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FirebaseFunctionsResponse } from 'functions/src/firebase-functions-response';
import { FunctionsService } from 'src/app/shared/services/functions/functions.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnDestroy {
  contactMe: FormGroup;
  sending: boolean = false;
  formResponse!: FirebaseFunctionsResponse;
  formSubmitted: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private functionsService: FunctionsService
  ) {
    this.contactMe = this.formBuilder.group({
      name: ['', Validators.required],
      phone: '',
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
        Validators.required
      ])],
      message: ''
    });
  }

  ngOnDestroy(): void {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

  get contactName(): AbstractControl | null {
    return this.contactMe.get('name');
  }

  get isContactNameInvalid(): boolean {
    return (this.contactName?.invalid && (this.contactName?.dirty || this.contactName?.touched)) || false;
  }

  get contactEmail(): AbstractControl | null {
    return this.contactMe.get('email');
  }

  get isContactEmailInvalid(): boolean {
    return (this.contactEmail?.invalid && (this.contactEmail?.dirty || this.contactEmail?.touched)) || false;
  }

  submitForm(): void {
    console.log('submitForm');
    this.sending = true;

    this.functionsService.sendEmail()(this.contactMe.value).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe({
      next: (result) => {
        console.log('submitForm Success ', result);
        this.formSubmitted = true;
        this.formResponse = result;
        this.sending = false;
      },
      error: (e) => {
        console.log('submitForm Error ', e);
        this.formSubmitted = true;
        this.formResponse = e;
        console.error('Form submit with error');
        this.sending = false;
      }
    });
  }
}
