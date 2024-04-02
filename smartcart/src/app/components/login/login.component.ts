import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userContentFormGroup!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userContentFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter method to access form controls
  get formControls() {
    return this.userContentFormGroup.controls;
  }

  submitForm() {

    if (this.userContentFormGroup.valid) {
      const credentials = {
        identifier: this.userContentFormGroup.value.email,
        password: this.userContentFormGroup.value.password
      };

      this.authService.login(credentials).subscribe({
        next: (res: any) => {
          // console.log('Login successful:', response);

          localStorage.setItem('token', JSON.stringify(res.jwt));
          localStorage.setItem('currentUser', JSON.stringify(res));
          localStorage.setItem('user_id', JSON.stringify(res.user.id));
          // Handle successful login (e.g., store token, redirect to home page)
          this.router.navigate(['/home']);  // Example of redirecting
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Something went wrong\nplease check your id and password!')
          this.isSubmitted = true;  // Consider marking form as submitted for UI feedback
        }
      });
    } else {
      this.userContentFormGroup.markAllAsTouched();
    }
  }

}


// submitForm() {
//   // this.isSubmitted = true;

//   this.userContentFormGroup.markAllAsTouched();

//   if (this.userContentFormGroup.invalid || !this.userContentFormGroup.touched) {
//     return;
//   }

//   // console.log('Form submitted successfully!', this.userContentFormGroup.value);

//   // Retrieve users from local storage
//   const users = JSON.parse(localStorage.getItem('users') || '[]');
//   const matchedUser = users.find((user: any) => user.email === this.userContentFormGroup.value.email
//     && user.password === this.userContentFormGroup.value.password);

//   // If matchedUser exists, store it as the current user in localStorage
//   if (matchedUser) {
//     console.log('User found!');
//     localStorage.setItem('currentUser', JSON.stringify(matchedUser));
//     this.router.navigate(['/home']);
//   } else {
//     alert('Invalid email or password!');
//     // Handle invalid email or password here (e.g., display error message)
//   }
// }
