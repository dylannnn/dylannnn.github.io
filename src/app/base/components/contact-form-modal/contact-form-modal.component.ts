import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import { faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-form-modal',
  templateUrl: './contact-form-modal.component.html',
  styleUrls: ['./contact-form-modal.component.scss']
})

export class ContactFormModalComponent implements OnInit {
  @Input() id: number;
  contactMe: FormGroup;
  validation_messages: any;
  submitting: boolean;
  formSubmitted = false;
  faSpinner = faSpinner;
  faCheckCircle = faCheckCircle;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.createForm();

    this.validation_messages = {
      'contactName': [
        { type: 'required', message: 'Name is required' }
      ],
      'contactEmail': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Enter a valid email' }
      ]
    };
  }

  ngOnInit() {
  }

  private createForm() {
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

  submitForm() {
    this.submitting = true;
    const sendEmail = firebase.functions().httpsCallable('sendEmail');
    sendEmail(this.contactMe.value).then(result => {
      this.formSubmitted = true;
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}
