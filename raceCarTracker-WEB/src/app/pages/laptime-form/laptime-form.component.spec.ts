import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptimeFormComponent } from './laptime-form.component';

describe('LaptimeFormComponent', () => {
  let component: LaptimeFormComponent;
  let fixture: ComponentFixture<LaptimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaptimeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
