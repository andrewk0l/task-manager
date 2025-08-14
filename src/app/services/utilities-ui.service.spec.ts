import { TestBed } from '@angular/core/testing';

import { UtilitiesUiService } from './utilities-ui.service';

describe('UtilitiesUiService', () => {
  let service: UtilitiesUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
