import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(
    fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = fb.group({
      'name': [''],
      'password': ['']
    });
  }

  async onSubmit(value: any) {
    await this.authService.login(value.name, value.password).subscribe({
      next: (userData) => {
        console.log('User logged in:', userData);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

}
