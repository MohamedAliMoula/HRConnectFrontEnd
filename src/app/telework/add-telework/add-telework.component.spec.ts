import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeleworkComponent } from './add-telework.component';

describe('AddTeleworkComponent', () => {
  let component: AddTeleworkComponent;
  let fixture: ComponentFixture<AddTeleworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeleworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeleworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
