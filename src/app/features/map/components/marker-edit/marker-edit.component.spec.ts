import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerEditComponent } from './marker-edit.component';

describe('MarkerEditComponent', () => {
  let component: MarkerEditComponent;
  let fixture: ComponentFixture<MarkerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
