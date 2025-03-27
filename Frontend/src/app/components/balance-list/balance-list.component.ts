import { Component, Input } from '@angular/core';
import { Transaction } from '../../interfaces/transaction';

@Component({
  selector: 'app-balance-list',
  standalone: true,
  imports: [],
  templateUrl: './balance-list.component.html',
  styleUrl: './balance-list.component.css'
})
export class BalanceListComponent {

  @Input() transactions: Transaction[] | undefined;

}
