import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaasComponent } from './iaas.component';

describe('IaasComponent', () => {
  let component: IaasComponent;
  let fixture: ComponentFixture<IaasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
