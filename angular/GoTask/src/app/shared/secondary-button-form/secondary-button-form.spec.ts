import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondaryButtonForm } from './secondary-button-form';

describe('SecondaryButtonForm', () => {
  let component: SecondaryButtonForm;
  let fixture: ComponentFixture<SecondaryButtonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryButtonForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryButtonForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
