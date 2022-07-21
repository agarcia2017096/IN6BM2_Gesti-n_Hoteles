import { TestBed } from '@angular/core/testing';

import { RegistroService } from './regitro.service';

describe('RegitroService', () => {
  let service: RegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
