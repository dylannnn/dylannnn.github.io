import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { openGraphData } from 'src/app/configurations/open-graph.data';
import { twitterCardData } from 'src/app/configurations/twitter-card.data';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(private meta: Meta) {}

  addOgGraphMeta(): void {
    openGraphData.forEach(data => {
      this.meta.addTag({
        property: data.property,
        content: data.content
      });
    });
  }

  addTwitterCardsMeta(): void {
    twitterCardData.forEach(data => {
      this.meta.addTag({
        name: data.name,
        content: data.content
      });
    });
  }
}
