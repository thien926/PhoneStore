import { TestBed } from '@angular/core/testing';

import { QuyenService } from './quyen.service';

describe('QuyenService', () => {
  let service: QuyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuyenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
