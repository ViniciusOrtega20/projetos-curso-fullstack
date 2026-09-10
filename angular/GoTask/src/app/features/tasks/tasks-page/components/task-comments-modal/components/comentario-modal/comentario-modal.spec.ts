import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentarioModal } from './comentario-modal';

describe('ComentarioModal', () => {
  let component: ComentarioModal;
  let fixture: ComponentFixture<ComentarioModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ComentarioModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
