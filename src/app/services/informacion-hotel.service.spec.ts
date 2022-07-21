import { TestBed } from '@angular/core/testing';

import { InformacionHotelService } from './informacion-hotel.service';

describe('InformacionHotelService', () => {
  let service: InformacionHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
