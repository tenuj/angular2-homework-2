import { TestBed, inject } from '@angular/core/testing';
import { FreeSoundService } from './free-sound.service';

describe('FreeSoundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreeSoundService]
    });
  });

  it('should ...', inject([FreeSoundService], (service: FreeSoundService) => {
    expect(service).toBeTruthy();
  }));
});
