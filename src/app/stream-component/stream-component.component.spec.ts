import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamComponentComponent } from './stream-component.component';

describe('StreamComponentComponent', () => {
  let component: StreamComponentComponent;
  let fixture: ComponentFixture<StreamComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
