import { TestBed } from '@angular/core/testing';

import { ShortenService } from './shortener.service';

describe('ShortenService', () => {
  let service: ShortenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
