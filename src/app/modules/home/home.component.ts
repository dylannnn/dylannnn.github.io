import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from 'src/app/shared/components/contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allowDownload = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  contactMe() {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
