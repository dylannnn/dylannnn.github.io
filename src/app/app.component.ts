import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { environment } from './../environments/environment';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit() {
    firebase.initializeApp(environment.firebaseConfig);
  }
}
