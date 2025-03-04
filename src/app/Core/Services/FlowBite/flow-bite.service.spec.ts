import { TestBed } from '@angular/core/testing';

import { FlowBiteService } from './flow-bite.service';

describe('FlowBiteService', () => {
  let service: FlowBiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowBiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
