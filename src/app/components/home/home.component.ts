import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormModalComponent } from 'src/app/components/contact-form-modal/contact-form-modal.component';
import { ContactForm } from 'src/app/core/models/contact-form.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  allowDownload = false;
  constructor(private modalService: NgbModal) { }

  contactMe(): void {
    const modalRef = this.modalService.open(ContactFormModalComponent, {
      windowClass: 'contact-modal',
      backdropClass: 'light-blue-backdrop',
      // size: 'md' as 'lg',
      centered: true
    });
    modalRef.componentInstance.id = 'contactMe';

    modalRef.result.then((formResult: ContactForm) => {
      console.log(formResult);
    }).catch((error) => {
      console.log(error);
    });
  }
}
