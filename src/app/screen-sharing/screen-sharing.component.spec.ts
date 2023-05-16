import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSharingComponent } from './screen-sharing.component';

describe('ScreenSharingComponent', () => {
  let component: ScreenSharingComponent;
  let fixture: ComponentFixture<ScreenSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenSharingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
