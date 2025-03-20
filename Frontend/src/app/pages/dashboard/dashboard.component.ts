import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

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

  constructor(private authService: AuthService, private transactionService: TransactionService) {
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
    
    this.transactionService.getBalance().subscribe({
      next: (balance) => {
        console.log('Balance:', balance);
      },
      error: (err) => {
        console.error('Error fetching balance:', err);
      }
    });
  }
}
