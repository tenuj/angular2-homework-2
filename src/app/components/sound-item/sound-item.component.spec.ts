import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundItemComponent } from './sound-item.component';

describe('SoundItemComponent', () => {
  let component: SoundItemComponent;
  let fixture: ComponentFixture<SoundItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
