import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: 'og:title',
      content: 'Yunfei is a Senior Frontend Developer and he resident in Amsterdam'
    });
    this.meta.addTag({
      name: 'og:image',
      content: 'https://www.yunfei.li/assets/img/home-preview.jpg'
    });
    this.meta.addTag({
      name: 'og:description',
      content: `Yunfei is a Senior Frontend Developer and he resident in Amsterdam, the Netherlands. He used to be a creative designer and focus on visual communication. Contact him at dylannnnlee@gmail.com`
    });
    this.meta.addTag({
      name: 'og:url',
      content: 'https://www.yunfei.li'
    });
  }
}
