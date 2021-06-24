import { Component } from '@angular/core';
import { MetaService } from './core/services/meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private metaService: MetaService) {
    this.metaService.addOgGraphMeta();
    this.metaService.addTwitterCardsMeta();
  }
}
