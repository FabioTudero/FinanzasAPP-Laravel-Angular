import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Balance } from '../../interfaces/balance';
import { Month } from '../../interfaces/month';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../interfaces/transaction';
import { BalanceCardComponent } from "../../components/balance-card/balance-card.component";
import { BalanceListComponent } from "../../components/balance-list/balance-list.component";
import { GraficComponent } from "../../components/grafic/grafic.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, BalanceCardComponent, BalanceListComponent, GraficComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user?: User;
  currentMonth: string | undefined;
  currentYear: number = new Date().getFullYear();
  balance: Balance | undefined;
  transactions: Transaction[] | undefined;
  selectedMonth: Month | undefined;
  months: Month[] | undefined;
  currentIdMonth: number = new Date().getMonth() + 1;

  constructor(private authService: AuthService, private transactionService: TransactionService) {
    const date = new Date();
    this.transactionService.getMonths().subscribe({
      next: (months: Month[]) => {
        this.months = months;
        this.currentMonth = this.months[date.getMonth()].name;
        this.selectedMonth = this.months[date.getMonth()];
      },
      error: (err) => {
        console.error('Error fetching months:', err);
      }
    });
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
    
    this.transactionService.getBalance(this.currentIdMonth, this.currentYear).subscribe({
      next: (balance) => {
        this.balance = balance;
      },
      error: (err) => {
        console.error('Error fetching balance:', err);
      }
    });

    this.transactionService.getTransactions(this.currentIdMonth, this.currentYear).subscribe({
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
