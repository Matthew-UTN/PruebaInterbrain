import { TestBed } from '@angular/core/testing';

import { reservaService } from './reserva.service';

describe('reservaService', () => {
  let service: reservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(reservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});