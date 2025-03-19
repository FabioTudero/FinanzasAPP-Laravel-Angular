import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {

  addTransactionForm: FormGroup;
  categories: Category[] = [];

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

}
