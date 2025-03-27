import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-modal-add-transaction',
  standalone: true,
  imports: [],
  templateUrl: './modal-add-transaction.component.html',
  styleUrl: './modal-add-transaction.component.css'
})
export class ModalAddTransactionComponent {

  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

}
