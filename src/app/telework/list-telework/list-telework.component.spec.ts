import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeleworkComponent } from './list-telework.component';

describe('ListTeleworkComponent', () => {
  let component: ListTeleworkComponent;
  let fixture: ComponentFixture<ListTeleworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTeleworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTeleworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
