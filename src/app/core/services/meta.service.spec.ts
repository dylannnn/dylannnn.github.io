import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { openGraphData } from 'src/app/configurations/open-graph.data';
import { twitterCardData } from 'src/app/configurations/twitter-card.data';

import { MetaService } from './meta.service';

describe('MetaService', () => {
  let meta: Meta;
  let service: MetaService;
  let metaServiceSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Meta,
          useClass: Meta
        }
      ],
    });
    meta = TestBed.inject(Meta);
    service = TestBed.inject(MetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add open graph meta data', () => {
    metaServiceSpy = spyOn(service, 'addOgGraphMeta').and.callThrough();
    service.addOgGraphMeta();
    expect(service.addOgGraphMeta).toHaveBeenCalled();
    openGraphData.forEach(data => {
      expect(meta.getTag(`property="${data.property}"`)?.content).toEqual(data.content);
    });
  });

  it('should add twitter card meta data', () => {
    metaServiceSpy = spyOn(service, 'addTwitterCardsMeta').and.callThrough();
    service.addTwitterCardsMeta();
    expect(service.addTwitterCardsMeta).toHaveBeenCalled();
    twitterCardData.forEach(data => {
      expect(meta.getTag(`name="${data.name}"`)?.content).toEqual(data.content);
    });
  });
});
