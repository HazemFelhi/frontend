import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginredirectComponent } from './loginredirect.component';

describe('LoginredirectComponent', () => {
  let component: LoginredirectComponent;
  let fixture: ComponentFixture<LoginredirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginredirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginredirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
