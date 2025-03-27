import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-modal-add-transaction',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add-transaction.component.html',
  styleUrl: './modal-add-transaction.component.css'
})
export class ModalAddTransactionComponent {

  addTransactionForm: FormGroup;
  categories: Category[] | undefined;

  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.addTransactionForm = this.fb.group({
      category_transaction_id: [''],
      amount: [''],
      type: [''],
      description: [''],
      day: [''],
      month: [''],
      year: ['']
    });
  }
  // Detectar tecla "Esc" y cerrar el modal
  @HostListener('document:keydown.escape', ['$event'])
  onEscKeydown(event: KeyboardEvent) {
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
  
  ngOnInit() {
    this.transactionService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

}
