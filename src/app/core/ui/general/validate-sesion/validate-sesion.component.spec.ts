import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateSesionComponent } from './validate-sesion.component';

describe('ValidateSesionComponent', () => {
  let component: ValidateSesionComponent;
  let fixture: ComponentFixture<ValidateSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
