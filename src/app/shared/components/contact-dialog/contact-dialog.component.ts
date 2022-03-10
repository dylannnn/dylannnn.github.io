import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { FunctionsService } from '../../services/functions/functions.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
  contactMe: FormGroup;
  sending: boolean = false;
  response$: Observable<any> = EMPTY;
  formSubmitted: boolean = false;

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

  ngOnInit(): void {
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

    this.response$ = this.functionsService.sendEmail()(this.contactMe.value);
    // this.fns.sendEmail(this.contactMe.value).subscribe(result => {
    //   this.formSubmitted = true;
    //   this.formResponse = result;
    // }, (error: FirebaseFunctionsResponse) => {
    //   this.formSubmitted = true;
    //   this.formResponse = error;
    // });
  }
}
