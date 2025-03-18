import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string | undefined;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      'name': [''],
      'password': ['']
    });
  }

  async onSubmit(value: any) {
    this.authService.register(value.name, value.password).subscribe({
      next: (userData) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

}
