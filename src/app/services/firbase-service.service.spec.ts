import { TestBed } from '@angular/core/testing';

import { FirbaseServiceService } from './firbase-service.service';

describe('FirbaseServiceService', () => {
  let service: FirbaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirbaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
