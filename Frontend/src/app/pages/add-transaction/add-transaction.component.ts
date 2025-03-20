import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {

  addTransactionForm: FormGroup;
  categories: Category[] | undefined;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.addTransactionForm = this.fb.group({
      amount: [''],
      category_transaction_id: [''],
      type: [''],
      description: [''],
      date: ['']
    });
  }  

  ngOnInit() {
    this.transactionService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Categories:', categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  onSubmit() {
    console.log('Form:', this.addTransactionForm.value);
  }

}
