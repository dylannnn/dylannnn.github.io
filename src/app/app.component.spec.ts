import { TestBed } from '@angular/core/testing';
import { By, Meta } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MetaService } from './core/services/meta.service';

describe('AppComponent', () => {
  let service: MetaService;
  let metaServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: Meta,
          useClass: Meta
        },
        MetaService
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    service = TestBed.inject(MetaService);
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call addOgGraphMeta', () => {
    metaServiceSpy = spyOn(service, 'addOgGraphMeta').and.callThrough();
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(service.addOgGraphMeta).toHaveBeenCalled();
    expect(metaServiceSpy.calls.count()).toEqual(1);
  });

  it('should call addTwitterCardsMeta', () => {
    metaServiceSpy = spyOn(service, 'addTwitterCardsMeta').and.callThrough();
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(service.addTwitterCardsMeta).toHaveBeenCalled();
    expect(metaServiceSpy.calls.count()).toEqual(1);
  });
});
