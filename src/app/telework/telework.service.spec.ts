import { TestBed } from '@angular/core/testing';

import { TeleworkService } from './telework.service';

describe('TeleworkService', () => {
  let service: TeleworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeleworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
