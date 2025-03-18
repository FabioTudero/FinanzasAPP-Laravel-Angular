import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = fb.group({
      'name': [''],
      'password': ['']
    });
  }

  async onSubmit(value: any) {
    await this.authService.register(value.name, value.password
    ).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

}
