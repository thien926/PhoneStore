import { TestBed } from '@angular/core/testing';

import { ChiTietHoaDonService } from './chi-tiet-hoa-don.service';

describe('ChiTietHoaDonService', () => {
  let service: ChiTietHoaDonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiTietHoaDonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
