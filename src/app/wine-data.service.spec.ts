import { TestBed, inject } from '@angular/core/testing';

import { WineDataService } from './wine-data.service';

describe('WineDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WineDataService]
    });
  });

  it('should be created', inject([WineDataService], (service: WineDataService) => {
    expect(service).toBeTruthy();
  }));
});
