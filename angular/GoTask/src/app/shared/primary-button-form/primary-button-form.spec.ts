import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryButtonForm } from './primary-button-form';

describe('PrimaryButtonForm', () => {
  let component: PrimaryButtonForm;
  let fixture: ComponentFixture<PrimaryButtonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryButtonForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryButtonForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
