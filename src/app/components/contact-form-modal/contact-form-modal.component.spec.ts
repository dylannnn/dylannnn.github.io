import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ResponseConstents } from 'functions/src/response-constents';
import { FirebaseFunctionsResponse, RESPONSE_STATUS_CODE } from 'functions/src/firebase-functions-response';
import { IContactForm } from 'src/app/core/models/contact-form.interface';
import { FirebaseFunctionService } from 'src/app/core/services/firebase-function.service';

import { ContactFormModalComponent } from './contact-form-modal.component';

describe('ContactFormModalComponent', () => {
  let component: ContactFormModalComponent;
  let fixture: ComponentFixture<ContactFormModalComponent>;
  let activeModal: NgbActiveModal;
  let contactForm: FormGroup;
  let contactName: AbstractControl | null;
  let contactEmail: AbstractControl | null;
  let contactPhone: AbstractControl | null;
  let contactMessage: AbstractControl | null;
  let firebaseFunctionService: FirebaseFunctionService;
  let firebaseFunctionServiceSpy: jasmine.Spy;
  let faIconLibrary: FaIconLibrary;
  let mockFormData: IContactForm;

  let responseSuccess: Observable<FirebaseFunctionsResponse>;
  let responseFailed: Observable<FirebaseFunctionsResponse>;

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
        FaIconLibrary,
        FirebaseFunctionService
      ]
    })
    .compileComponents();

    activeModal = TestBed.inject(NgbActiveModal);
    firebaseFunctionService = TestBed.inject(FirebaseFunctionService);
    faIconLibrary = TestBed.inject(FaIconLibrary);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormModalComponent);
    component = fixture.componentInstance;

    contactForm = component.contactMe;

    contactName = contactForm.get('name');
    contactEmail = contactForm.get('email');
    contactPhone = contactForm.get('phone');
    contactMessage = contactForm.get('message');

    mockFormData = {
      name: 'Unit',
      phone: '123456789',
      email: 'abc@unit-test.com',
      message: 'Unit test'
    }

    responseSuccess = of(new FirebaseFunctionsResponse('Success', RESPONSE_STATUS_CODE.OK, 'Unit test success'));
    responseFailed = of(new FirebaseFunctionsResponse('Failed', RESPONSE_STATUS_CODE.SERVICE_ERROR, 'Unit test failed'));

    faIconLibrary.addIcons(
      faSpinner,
      faCheckCircle,
      faTimes
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create contact form', () => {
    expect(contactForm).toBeTruthy();

    expect(component.contactName).toBeTruthy();
    expect(contactName).toBe(component.contactName);

    expect(contactPhone).toBeTruthy();

    expect(component.contactEmail).toBeTruthy();
    expect(contactEmail).toBe(component.contactEmail);

    expect(contactMessage).toBeTruthy();
  });

  it('should show contact name is required', () => {
    contactName?.markAsDirty();
    expect(contactName?.valid).toBeFalsy();
    expect(component.isContactNameInvalid).toBeTruthy();

    contactName?.setValue(mockFormData.name);
    expect(contactName?.valid).toBeTruthy();
    expect(component.isContactNameInvalid).toBeFalsy();
  });

  it('should show contact email is required and has proper email validation', () => {
    contactEmail?.markAsDirty();
    expect(contactEmail?.valid).toBeFalsy();
    expect(component.isContactEmailInvalid).toBeTruthy();

    contactEmail?.setValue('unit-test');
    expect(contactEmail?.valid).toBeFalsy();
    expect(component.isContactEmailInvalid).toBeTruthy();

    contactEmail?.setValue('unit-test.com');
    expect(contactEmail?.valid).toBeFalsy();
    expect(component.isContactEmailInvalid).toBeTruthy();

    contactEmail?.setValue(mockFormData.email);
    expect(contactEmail?.valid).toBeTruthy();
    expect(component.isContactEmailInvalid).toBeFalsy();
  });

  it('should submit form', () => {


    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeTrue();
    component.contactName?.setValue(mockFormData.name);
    component.contactEmail?.setValue(mockFormData.email);
    contactPhone?.setValue(mockFormData.phone);
    contactMessage?.setValue(mockFormData.message);
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();

    firebaseFunctionServiceSpy = spyOn(firebaseFunctionService, 'sendEmail').and.callThrough().and.returnValue(of(new FirebaseFunctionsResponse('Success', RESPONSE_STATUS_CODE.OK, 'Unit test success')));
    component.submitForm();
    fixture.detectChanges();

    expect(firebaseFunctionService.sendEmail).toHaveBeenCalledOnceWith(mockFormData);
  });

  it('should call firebase function - sendEmail with success', () => {
    firebaseFunctionServiceSpy = spyOn(firebaseFunctionService, 'sendEmail').and.callThrough().and.returnValue(responseSuccess);
    firebaseFunctionService.sendEmail(mockFormData);
    expect(firebaseFunctionService.sendEmail).toHaveBeenCalledOnceWith(mockFormData);
  });

  it('should call firebase function - sendEmail with failer', () => {
    firebaseFunctionServiceSpy = spyOn(firebaseFunctionService, 'sendEmail').and.returnValues(responseFailed);
    const formResponse = firebaseFunctionService.sendEmail(mockFormData);
    expect(firebaseFunctionService.sendEmail).toHaveBeenCalledWith(mockFormData);
    expect(formResponse).toEqual(responseFailed);
  });

  it('should show success message', () => {
    component.formSubmitted = true;
    component.formResponse = new FirebaseFunctionsResponse(
      ResponseConstents.MESSAGE_SUCCESS,
      RESPONSE_STATUS_CODE.OK,
      ResponseConstents.DETAILES_SUCCESS
    );
    fixture.detectChanges();
    const successMessage = fixture.debugElement.query(By.css('.modal-body'));
    const successMessageElm = successMessage.nativeElement as HTMLElement;
    expect(successMessageElm.textContent).toContain(ResponseConstents.DETAILES_SUCCESS);
  });
});

