import { TestBed, inject } from '@angular/core/testing';
import { ProtocolService } from './protocol.service';

describe('ProtocolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtocolService]
    });
  });

  it('should ...', inject([ProtocolService], (service: ProtocolService) => {
    expect(service).toBeTruthy();
  }));
});
