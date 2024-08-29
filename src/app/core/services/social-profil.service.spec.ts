import { TestBed } from '@angular/core/testing';

import { SocialProfilService } from './social-profil.service';

describe('SocialProfilService', () => {
  let service: SocialProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialProfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
