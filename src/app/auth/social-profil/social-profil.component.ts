import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SocialProfil } from 'src/app/core/models/SocialProfil';
import { User } from 'src/app/core/models/User';
import { SocialProfilService } from 'src/app/core/services/social-profil.service';
import { UserService } from 'src/app/core/services/user.service';

export function socialLinkValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  // Regular expressions for validating social media links
  const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/;
  const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/;
  const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|user\/)?[a-zA-Z0-9_-]+\/?$/;
  

  // Check if the value matches the regex for each social media platform
  if (value) {
    
    if (!twitterRegex.test(value)) {
      return { 'invalidTwitterLink': true };
    }
    if (!facebookRegex.test(value)) {
      return { 'invalidFacebookLink': true };
    }
    if (!instagramRegex.test(value)) {
      return { 'invalidInstagramLink': true };
    }
    if (!linkedinRegex.test(value)) {
      return { 'invalidLinkedInLink': true };
    }
    if (!youtubeRegex.test(value)) {
      return { 'invalidYouTubeLink': true };
    }
  }
  
  return null; // If the value is empty or all links are valid, return null
}


@Component({
  selector: 'app-social-profil',
  templateUrl: './social-profil.component.html',
  styleUrls: ['./social-profil.component.css']
})
export class SocialProfilComponent implements OnInit {
  user:User;
  socialprofil:SocialProfil;
  pieChart: any;
  profileForm: FormGroup;

  constructor(private userservice: UserService,
    private socialprofilservice:SocialProfilService,
    private toastr: ToastrService,

    private http: HttpClient,
    private fb: FormBuilder) { }
    ngOnInit(): void {
      this.CurrentUser();
      this.profileForm = this.fb.group({
        id: [],
        iduser: [],
        twitter: ['', [ Validators.pattern("(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9.\/]+\/?")]],
        facebook: ['', [Validators.required, Validators.pattern("(https:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.\/]+\/?")]],
        instagram: ['', [ Validators.pattern("(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9.\_\/]+\/?")]],
        linkedin: ['', [ Validators.pattern("(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\.\-]+\/?")]],
        youtube: ['', [Validators.pattern("(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|user\/)?[a-zA-Z0-9.\/]+\/?/")]]
      });
    }

     CurrentUser() {
    this.userservice.getCurentUser()
    .subscribe({
      next: (response) => {
        this.user=response;
          console.log(this.user);
          
        },
        error:(err)=>{

        } 
       
    });
 
  }

  getAdminPhotoUrl(user: User): string {
    if (user && user.image) {
      return this.userservice.getPhoto(user.image);
    } else {
      return null;
    }
  }
  
  
 savesocialprofil() {
  
    if (this.profileForm.valid){
       this.profileForm.get('iduser').setValue(this.user.id);
       this.socialprofilservice.addSocialprofil(this.profileForm.value)
      .subscribe({
        next: (social) => {
          console.log('User updated:', social);
          this.toastr.success('', 'Success!\nUser updated', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right'
          });
        },
        error: (err) => {
    
        }
      });
    }
  
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.http.post('http://localhost:8090/api/uploadFile', formData, { responseType: 'text' })
            .subscribe({
                next: (response) => {
                    console.log("Uploaded Successfully:", response);
                    let url = response.substring(40);
                    console.log(url);
                    this.user.image = url;
                },
                error: (error) => console.error("Upload Error:", error)
            });
    }
  }
}
