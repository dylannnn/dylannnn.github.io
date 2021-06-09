import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-contact-form-modal',
  templateUrl: './contact-form-modal.component.html',
  styleUrls: ['./contact-form-modal.component.scss']
})
export class ContactFormModalComponent {
  submitting = false;
  formSubmitted = false;
  contactMe: FormGroup;
  @Input() id: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private fns: AngularFireFunctions
  ) {
    this.contactMe = this.formBuilder.group({
      contactName: ['', Validators.required],
      contactPhone: '',
      contactEmail: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
        Validators.required
      ])],
      contactMessage: ''
    });
  }

  get contactName(): AbstractControl | null {
    return this.contactMe.get('contactName');
  }

  get isContactNameInvalid(): boolean {
    return (this.contactName?.invalid && (this.contactName?.dirty || this.contactName?.touched)) || false;
  }

  get contactEmail(): AbstractControl | null {
    return this.contactMe.get('contactEmail');
  }

  get isContactEmailInvalid(): boolean {
    return (this.contactEmail?.invalid && (this.contactEmail?.dirty || this.contactEmail?.touched)) || false;
  }

  submitForm(): void {
    this.submitting = true;

    const sendEmail = this.fns.httpsCallable('sendEmail');

    sendEmail(this.contactMe.value).subscribe(result => {
      this.formSubmitted = true;
    }, error => {
      console.log('Submit with error :( ', error);
    });
  }
}
