import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialProfilComponent } from './social-profil.component';

describe('SocialProfilComponent', () => {
  let component: SocialProfilComponent;
  let fixture: ComponentFixture<SocialProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
