import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Balance } from '../../interfaces/balance';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../interfaces/transaction';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
  user?: User;
  currentMonth: string;
  balance: Balance | undefined;
  transactions: Transaction[] | undefined;

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
        this.balance = balance;
      },
      error: (err) => {
        console.error('Error fetching balance:', err);
      }
    });

    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions
        console.log('Transactions:', transactions);
        
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      }
    });
  }
}
