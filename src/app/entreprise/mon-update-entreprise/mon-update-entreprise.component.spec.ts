import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonUpdateEntrepriseComponent } from './mon-update-entreprise.component';

describe('MonUpdateEntrepriseComponent', () => {
  let component: MonUpdateEntrepriseComponent;
  let fixture: ComponentFixture<MonUpdateEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonUpdateEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonUpdateEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
