import { TestBed } from '@angular/core/testing';

import { DocxtemplaterService } from './docxtemplater.service';

describe('DocxtemplaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocxtemplaterService = TestBed.get(DocxtemplaterService);
    expect(service).toBeTruthy();
  });
});
