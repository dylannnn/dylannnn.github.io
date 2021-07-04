import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Observable, of } from 'rxjs';
import { FirebaseFunctionsResponse, RESPONSE_STATUS_CODE } from 'shared/models/firebase-functions-response';
import { IContactForm } from 'src/app/core/models/contact-form.interface';

import { FirebaseFunctionService } from './firebase-function.service';
import { FirebaseFunctionAPIs } from './firebase-functions-api.service';

const data: IContactForm = {
  name: 'Fake Unit',
  email: 'fake-unit@unit-test.com'
};

describe('FirebaseFunctionService', () => {
  let service: FirebaseFunctionService;
  let firebaseFunctionApiSpy: jasmine.SpyObj<FirebaseFunctionAPIs>;

  beforeEach(() => {
    const spyOnSendEmail = jasmine.createSpyObj('FirebaseFunctionAPIs', ['sendEmail']);
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp({}),
      ],
      providers: [
        FirebaseFunctionService,
        { provide: FirebaseFunctionAPIs, useValue: spyOnSendEmail }
      ]
    });

    service = TestBed.inject(FirebaseFunctionService);

    firebaseFunctionApiSpy = TestBed.inject(FirebaseFunctionAPIs) as jasmine.SpyObj<FirebaseFunctionAPIs>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send email successfully', () => {
    const successResponse: Observable<FirebaseFunctionsResponse> = of({
      message: 'Unit test Success',
      status: RESPONSE_STATUS_CODE.OK,
      details: 'Unit test Success'
    });
    firebaseFunctionApiSpy.sendEmail.and.returnValue(successResponse);
    expect(service.sendEmail(data)).toEqual(successResponse);
    expect(firebaseFunctionApiSpy.sendEmail).toHaveBeenCalledWith(data);
    expect(firebaseFunctionApiSpy.sendEmail.calls.count()).toBe(1);
    expect(firebaseFunctionApiSpy.sendEmail.calls.mostRecent().returnValue).toEqual(successResponse);
  });

  it('should send email failed', () => {
    const failedResponse: Observable<FirebaseFunctionsResponse> = of({
      message: 'Unit test Failed',
      status: RESPONSE_STATUS_CODE.SERVICE_ERROR,
      details: 'Unit test Failed'
    });
    firebaseFunctionApiSpy.sendEmail.and.returnValue(failedResponse);
    expect(service.sendEmail(data)).toEqual(failedResponse);
    expect(firebaseFunctionApiSpy.sendEmail).toHaveBeenCalledWith(data);
    expect(firebaseFunctionApiSpy.sendEmail.calls.count()).toBe(1);
    expect(firebaseFunctionApiSpy.sendEmail.calls.mostRecent().returnValue).toEqual(failedResponse);
  });
});
