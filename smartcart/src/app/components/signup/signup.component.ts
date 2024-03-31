import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  userContentFormGroup!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userContentFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter method to access form controls
  get formControls() {
    return this.userContentFormGroup.controls;
  }

  submitForm() {

    console.log(this.userContentFormGroup.value)

    if (this.userContentFormGroup.valid) {
      // Generate unique customer ID
      const customerId = this.generateCustomerId();
      const cred = {
        'customer_id': customerId,
        'username': this.userContentFormGroup.value.name,
        'email': this.userContentFormGroup.value.email,
        'password': this.userContentFormGroup.value.password
      }
      console.log(cred);
      this.authService.register(cred).subscribe({
        next: (res: any) => {
          console.log(res)
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    } else {
      this.userContentFormGroup.markAllAsTouched();
    }
  }


  generateCustomerId(): string {
    // Generate a random string of characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let customerId = '';
    for (let i = 0; i < length; i++) {
      customerId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return customerId;
  }

}



// submitform(){
// this.userContentFormGroup.markAllAsTouched();

// if (this.userContentFormGroup.invalid || !this.userContentFormGroup.touched) {
//   return;
// }

// // Retrieve users from local storage
// const users = JSON.parse(localStorage.getItem('users') || '[]');

// // Add customer ID to user details
// const userData = {
//   id: customerId,
//   ...this.userContentFormGroup.value
// };

// users.push(userData);
// localStorage.setItem('users', JSON.stringify(users));
// this.router.navigate(['/login']);
// }


// onSubmit() {
//   this.isSubmitted = true;

//   // If form is invalid, do not proceed
//   if (this.userContentFormGroup.invalid) {
//     return;
//   }

//   // Form is valid, proceed with submission
//   console.log('Form submitted successfully!', this.userContentFormGroup.value);
// }