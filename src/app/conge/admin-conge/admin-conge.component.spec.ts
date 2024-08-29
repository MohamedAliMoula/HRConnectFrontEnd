import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongeComponent } from './admin-conge.component';

describe('AdminCongeComponent', () => {
  let component: AdminCongeComponent;
  let fixture: ComponentFixture<AdminCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
