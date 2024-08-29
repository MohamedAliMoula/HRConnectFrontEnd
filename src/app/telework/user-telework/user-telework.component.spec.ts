import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeleworkComponent } from './user-telework.component';

describe('UserTeleworkComponent', () => {
  let component: UserTeleworkComponent;
  let fixture: ComponentFixture<UserTeleworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTeleworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTeleworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
