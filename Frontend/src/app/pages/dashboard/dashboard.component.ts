import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user?: User;
  currentMonth: string;

  constructor(private authService: AuthService) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.currentMonth = months[new Date().getMonth()];
  }

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
}
