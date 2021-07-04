import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';

// Mock class for NgbModalRef
export class MockNgbModalRef {
  componentInstance = {
      prompt: undefined,
      title: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let modalService: NgbModal;
  let modalServiceSpy: jasmine.Spy;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ NgbModal ],
      imports: [ NgbModalModule ]
    })
    .compileComponents();

    modalService = TestBed.inject(NgbModal);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show download CV button - Resume', () => {
    const button = fixture.debugElement.query(By.css('#cv-download'));
    const buttonElm = button.nativeElement as HTMLAnchorElement;
    expect(button).toBeTruthy();
    expect(buttonElm.textContent?.trim()).toEqual('Resume');
  });

  it('should hide download CV button if not allow download', () => {
    component.allowDownload = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#cv-download'));
    expect(button).toBeFalsy();
  });

  it('should show contact me button and click to open contact form', () => {
    const button = fixture.debugElement.query(By.css('#contact-me'));
    const buttonElm = button.nativeElement as HTMLAnchorElement;
    expect(button).toBeTruthy();
    expect(buttonElm.textContent?.trim()).toEqual('Contact me');
    modalServiceSpy = spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    component.contactMe();
    expect(modalService.open).toHaveBeenCalled();
  });
});
