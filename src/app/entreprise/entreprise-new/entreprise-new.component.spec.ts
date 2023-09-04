import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseNewComponent } from './entreprise-new.component';

describe('EntrepriseNewComponent', () => {
  let component: EntrepriseNewComponent;
  let fixture: ComponentFixture<EntrepriseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepriseNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepriseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
