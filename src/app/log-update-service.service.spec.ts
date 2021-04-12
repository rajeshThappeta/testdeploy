import { TestBed } from '@angular/core/testing';

import { LogUpdateServiceService } from './log-update-service.service';

describe('LogUpdateServiceService', () => {
  let service: LogUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
