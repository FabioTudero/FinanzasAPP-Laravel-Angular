import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Balance } from '../../interfaces/balance';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../interfaces/transaction';

interface Month {
  id: number;
  name: string;
}

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
  selectedMonth: Month | undefined;
  months: Month[] = [
    { id: 1, name: 'Enero' },
    { id: 2, name: 'Febrero' },
    { id: 3, name: 'Marzo' },
    { id: 4, name: 'Abril' },
    { id: 5, name: 'Mayo' },
    { id: 6, name: 'Junio' },
    { id: 7, name: 'Julio' },
    { id: 8, name: 'Agosto' },
    { id: 9, name: 'Septiembre' },
    { id: 10, name: 'Octubre' },
    { id: 11, name: 'Noviembre' },
    { id: 12, name: 'Diciembre' }
  ];

  constructor(private authService: AuthService, private transactionService: TransactionService) {
    const date = new Date();
    this.currentMonth = this.months[date.getMonth()].name;
    this.selectedMonth = this.months[date.getMonth()];
  }

  ngOnInit() {
    console.log(this.months[new Date().getMonth()]);
    
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
