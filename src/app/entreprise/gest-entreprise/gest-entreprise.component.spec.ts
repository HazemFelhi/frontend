import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestEntrepriseComponent } from './gest-entreprise.component';

describe('GestEntrepriseComponent', () => {
  let component: GestEntrepriseComponent;
  let fixture: ComponentFixture<GestEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
