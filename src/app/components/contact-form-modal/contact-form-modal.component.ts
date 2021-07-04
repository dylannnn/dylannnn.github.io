import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseFunctionsResponse } from 'shared/models/firebase-functions-response';
import { FirebaseFunctionService } from 'src/app/core/services/firebase-function.service';

@Component({
  selector: 'app-contact-form-modal',
  templateUrl: './contact-form-modal.component.html',
  styleUrls: ['./contact-form-modal.component.scss']
})
export class ContactFormModalComponent {
  formResponse: FirebaseFunctionsResponse | null = null;
  submitting = false;
  formSubmitted = false;
  contactMe: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private fns: FirebaseFunctionService
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
    this.submitting = true;

    this.fns.sendEmail(this.contactMe.value).subscribe(result => {
      this.formSubmitted = true;
      this.formResponse = result;
    }, (error: FirebaseFunctionsResponse) => {
      this.formSubmitted = true;
      this.formResponse = error;
    });
  }
}
