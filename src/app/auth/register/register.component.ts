import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationResponse } from 'src/app/core/models/authentication-response';
import { RegisterRequest } from 'src/app/core/models/register-request';
import { VerificationRequest } from 'src/app/core/models/verification-request';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userform: FormGroup;
  emailQuest:string;
  roles: string[] = ['EMPLOYEE', 'COMPTABLE','MANAGER',];
  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message = '';
  otpCode = '';
  ngOnInit(): void {
    this.userform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['EMPLOYEE', Validators.required],
      birthday: [new Date(), Validators.required],
      phoneNumber: [null],
      password:[''],
      image: [''],
      ncin: [''],
      company: [''],
      mfaEnabled: [false] // added rememberMe field

    });
  }
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private router: Router,
    private http: HttpClient
  ) {
  }
  get f() {
    return this.userform.controls;
  }
  addQuest(): void {
    this.emailQuest=this.userform.value.email;
    // If form is invalid, do not submit
    if (this.userform.invalid) {
      return;
    }

    // If form is valid, continue with adding quest
    this.authService.register(this.userform.value)
    .subscribe({
      next: (response) => {
        if (response) {
          this.authResponse = response;
          
        } else {
          // inform the user
          this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000)}
        console.log('User added successfully.');
        this.toastr.success('', 'Success!', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right'
        });
        // Reset form after successful submission
        this.userform.reset();
      },
      error: (error) => console.error("Upload Error:", error)
  });
  }


  verifyTfa() {
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.emailQuest,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          this.message = 'Notification de traitement de compte en cours\nYou will be redirected to the Welcome page in 3 seconds';
          setTimeout(() => {
            // localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['login']);
          }, 3000);
        }
      });
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
                    let url = response.substring(36);
                    console.log(url);

                    // Assuming you have a registerRequest object initialized
                    this.registerRequest.image = url;
                },
                error: (error) => console.error("Upload Error:", error)
            });
    }
}
navigateToHome() {
  this.router.navigate(['/home']);
}

}
