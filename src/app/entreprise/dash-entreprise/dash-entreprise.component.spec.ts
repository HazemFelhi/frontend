import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEntrepriseComponent } from './dash-entreprise.component';

describe('DashEntrepriseComponent', () => {
  let component: DashEntrepriseComponent;
  let fixture: ComponentFixture<DashEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
