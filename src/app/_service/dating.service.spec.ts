import { TestBed } from '@angular/core/testing';

import { DatingService } from './dating.service';

describe('DatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatingService = TestBed.get(DatingService);
    expect(service).toBeTruthy();
  });
});
