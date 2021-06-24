import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { ContactFormModalComponent } from './contact-form-modal.component';

describe('ContactFormModalComponent', () => {
  let component: ContactFormModalComponent;
  let fixture: ComponentFixture<ContactFormModalComponent>;
  let activeModal: NgbActiveModal;
  let contactForm: FormGroup;
  let firebaseFunction: AngularFireFunctions;
  let firebaseFunctionSpy: jasmine.Spy;
  let faIconLibrary: FaIconLibrary

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFormModalComponent ],
      imports: [
        ReactiveFormsModule,
        AngularFireModule.initializeApp({}),
        FontAwesomeModule
      ],
      providers: [
        NgbActiveModal,
        FormBuilder,
        AngularFireFunctions,
        FaIconLibrary
      ]
    })
    .compileComponents();

    activeModal = TestBed.inject(NgbActiveModal);
    firebaseFunction = TestBed.inject(AngularFireFunctions);
    faIconLibrary = TestBed.inject(FaIconLibrary);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormModalComponent);
    component = fixture.componentInstance;
    contactForm = component.contactMe;
    faIconLibrary.addIcons(
      faSpinner,
      faCheckCircle);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create contact form', () => {
    expect(contactForm).toBeTruthy();

    expect(component.contactName).toBeTruthy();
    expect(contactForm.get('contactName')).toBe(component.contactName);

    expect(contactForm.get('contactPhone')).toBeTruthy();

    expect(component.contactEmail).toBeTruthy();
    expect(contactForm.get('contactEmail')).toBe(component.contactEmail);

    expect(contactForm.get('contactMessage')).toBeTruthy();
  });

  it('should show contact name is required', () => {
    contactForm.get('contactName')?.markAsDirty();
    expect(contactForm.get('contactName')?.valid).toBeFalsy();
    expect(component.isContactNameInvalid).toBeTruthy();

    contactForm.get('contactName')?.setValue('Unit test');
    expect(contactForm.get('contactName')?.valid).toBeTruthy();
    expect(component.isContactNameInvalid).toBeFalsy();
  });

  it('should show contact email is required and has proper email validation', () => {
    contactForm.get('contactEmail')?.markAsDirty();
    expect(contactForm.get('contactEmail')?.valid).toBeFalsy();
    expect(component.isContactEmailInvalid).toBeTruthy();

    contactForm.get('contactEmail')?.setValue('unit-test');
    expect(contactForm.get('contactEmail')?.valid).toBeFalsy();
    expect(component.isContactEmailInvalid).toBeTruthy();

    contactForm.get('contactEmail')?.setValue('unit-test.com');
    expect(contactForm.get('contactEmail')?.valid).toBeFalsy();
    expect(component.isContactEmailInvalid).toBeTruthy();

    contactForm.get('contactEmail')?.setValue('abc@unit-test.com');
    expect(contactForm.get('contactEmail')?.valid).toBeTruthy();
    expect(component.isContactEmailInvalid).toBeFalsy();
  });

  it('should call firebase function - sendEmail with success', () => {
    firebaseFunctionSpy = spyOn(firebaseFunction, 'httpsCallable').and.callThrough().and.returnValue(() => of({
      message: 'success',
      status: 200,
      feel: 'Happy',
    }));
    firebaseFunction.httpsCallable('sendEmail');
    expect(firebaseFunction.httpsCallable).toHaveBeenCalledOnceWith('sendEmail');
  });

  it('should call firebase function - sendEmail with failer', () => {
    const throwMeAnError = function() {
      throw new Error('Send email Failed');
    };
    firebaseFunctionSpy = spyOn(firebaseFunction, 'httpsCallable').and.callFake(() => throwMeAnError);

    expect(firebaseFunction.httpsCallable('sendEmail')).toThrowError('Send email Failed');
    expect(firebaseFunction.httpsCallable).toHaveBeenCalledWith('sendEmail');
  });

  it('should show success message', () => {
    component.formSubmitted = true;
    fixture.detectChanges();
    const successMessage = fixture.debugElement.query(By.css('.modal-body'));
    const successMessageElm = successMessage.nativeElement as HTMLElement;
    expect(successMessageElm.textContent).toContain('Thank you for your message. I will get back to you ASAP.')
  });
});

