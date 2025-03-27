import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Balance } from '../../interfaces/balance';
import { BalanceCardComponent } from "../../components/balance-card/balance-card.component";
import { BalanceListComponent } from "../../components/balance-list/balance-list.component";
import { Transaction } from '../../interfaces/transaction';
import { ModalAddTransactionComponent } from '../../components/modal-add-transaction/modal-add-transaction.component';

@Component({
  selector: 'app-balance-per-month',
  standalone: true,
  imports: [BalanceCardComponent, BalanceListComponent, ModalAddTransactionComponent],
  templateUrl: './balance-per-month.component.html',
  styleUrl: './balance-per-month.component.css'
})
export class BalancePerMonthComponent {

  months: any[] | undefined;
  currentMonth: number;
  currentYear: number;
  balance: Balance | undefined;
  transactions: Transaction[] | undefined;
  showModal = false;

  constructor(private transactionService: TransactionService) {
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
    this.transactionService.getMonths().subscribe({
      next: (months) => {
        this.months = months;
      },
      error: (err) => {
        console.error('Error fetching months:', err);
      }
    });
  }

  ngOnInit() {
    this.getBalance();
    this.getTransactions();
  }
    
  getMonth(id: number) {
    this.currentMonth = id;
    this.getBalance();
    this.getTransactions();
  }

  sumYear() {
    this.currentYear++;
    this.getBalance();
    this.getTransactions();
  }
  
  subtractYear() {
    this.currentYear--;
    this.getBalance();
    this.getTransactions();
  }

  getBalance() {
    this.transactionService.getBalance(this.currentMonth, this.currentYear).subscribe({
      next: (balance) => {
        this.balance = balance;
      },
      error: (err) => {
        console.error('Error fetching balance:', err);
      }
    });
  }

  getTransactions() {
    this.transactionService.getTransactions(this.currentMonth, this.currentYear).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      }
    });
  }
}
