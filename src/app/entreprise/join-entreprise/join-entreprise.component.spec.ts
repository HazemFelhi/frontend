import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinEntrepriseComponent } from './join-entreprise.component';

describe('JoinEntrepriseComponent', () => {
  let component: JoinEntrepriseComponent;
  let fixture: ComponentFixture<JoinEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
