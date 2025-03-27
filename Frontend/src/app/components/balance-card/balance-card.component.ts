import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  standalone: true,
  imports: [],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.css'
})
export class BalanceCardComponent {

  @Input() balance: any;

}
