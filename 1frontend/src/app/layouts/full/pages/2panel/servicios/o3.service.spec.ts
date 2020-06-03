import { TestBed } from '@angular/core/testing';

import { O3Service } from './o3.service';

describe('O3Service', () => {
  let service: O3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(O3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
