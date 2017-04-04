import { TestBed, inject } from '@angular/core/testing';
import { FreeSoundResultResolverService } from './free-sound-result-resolver.service';

describe('FreeSoundResultResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreeSoundResultResolverService]
    });
  });

  it('should ...', inject([FreeSoundResultResolverService], (service: FreeSoundResultResolverService) => {
    expect(service).toBeTruthy();
  }));
});
