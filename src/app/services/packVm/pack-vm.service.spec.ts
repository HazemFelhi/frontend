import { TestBed } from '@angular/core/testing';

import { PackVmService } from './pack-vm.service';

describe('PackVmService', () => {
  let service: PackVmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackVmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
