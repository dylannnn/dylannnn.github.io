import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormModalComponent } from 'src/app/components/contact-form-modal/contact-form-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  allowDownload = true;
  constructor(private modalService: NgbModal) { }

  contactMe(): void {
    this.modalService.open(ContactFormModalComponent, {
      windowClass: 'contact-modal',
      backdropClass: 'light-blue-backdrop',
      // size: 'md' as 'lg',
      centered: true
    });
  }
}
