import { TestBed } from '@angular/core/testing';

import { LaptimeService } from './laptime.service';

describe('CarService', () => {
  let service: LaptimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaptimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
