import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTeleworkComponent } from './archived-telework.component';

describe('ArchivedTeleworkComponent', () => {
  let component: ArchivedTeleworkComponent;
  let fixture: ComponentFixture<ArchivedTeleworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedTeleworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedTeleworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
