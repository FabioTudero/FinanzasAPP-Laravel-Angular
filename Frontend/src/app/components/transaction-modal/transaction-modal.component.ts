import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {

  isModalOpen = false;
  @Output() close = new EventEmitter<void>();

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
