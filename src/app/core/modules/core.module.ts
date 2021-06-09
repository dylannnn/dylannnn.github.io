import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { NgBootstrapModule } from './ng-bootstrap.module';

import { ContactFormModalComponent } from 'src/app/components/contact-form-modal/contact-form-modal.component';

@NgModule({
  declarations: [
    ContactFormModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    NgBootstrapModule,
    FontAwesomeModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireFunctionsModule,
    NgBootstrapModule,
    FontAwesomeModule,
    ContactFormModalComponent
  ]
})
export class CoreModule {
  constructor(private faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faSpinner,
      faCheckCircle
    );
  }
}
