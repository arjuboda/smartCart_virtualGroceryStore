import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formData = {
    email: '',
    password: ''
  };
  submitForm() {
    // Here you can implement your logic to submit the form data
    console.log('Form submitted:', this.formData);
    // You can also call a service to send the form data to the backend
  }
}
