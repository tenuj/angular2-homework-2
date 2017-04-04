import { TestBed, inject } from '@angular/core/testing';
import { FreeSoundUtilsService } from './free-sound-utils.service';

describe('FreeSoundUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreeSoundUtilsService]
    });
  });

  it('should ...', inject([FreeSoundUtilsService], (service: FreeSoundUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
