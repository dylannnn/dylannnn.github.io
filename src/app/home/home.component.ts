import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormModalComponent } from '../base/components/contact-form-modal/contact-form-modal.component';
import { FormPost } from '../base/services/IFormPost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  allowDownload: boolean;
  constructor(private modalService: NgbModal) { }
  ngOnInit() {}

  public contactMe() {
    const modalRef = this.modalService.open(ContactFormModalComponent, {
      windowClass: 'contact-modal',
      backdropClass: 'light-blue-backdrop',
      // size: 'md' as 'lg',
      centered: true
    });
    modalRef.componentInstance.id = 'contactMe';

    modalRef.result.then((formResult: FormPost) => {
      console.log(formResult);
    }).catch((error) => {
      console.log(error);
    });
  }
}
