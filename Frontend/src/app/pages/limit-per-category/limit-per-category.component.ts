import { Component } from '@angular/core';
import { Category } from '../../interfaces/category';
import { TransactionService } from '../../services/transaction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-limit-per-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './limit-per-category.component.html',
  styleUrl: './limit-per-category.component.css'
})
export class LimitPerCategoryComponent {

  addLimitFormm: FormGroup;
  categories: Category[] | undefined;
  limits: any[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ){
    this.transactionService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
    this.addLimitFormm = this.fb.group({
      category_transaction_id: [''],
      limit: [''],
    });

    this.transactionService.getLimits().subscribe({
      next: (limits) => {
        this.limits = limits; 
      },
      error: (err) => {
        console.error('Error fetching limits:', err);
      }
    }); 
  }

  onSubmit() {
    this.transactionService.addLimit(this.addLimitFormm.value).subscribe({
      next: (response) => {
        this.transactionService.getLimits().subscribe({
          next: (limits) => {
            this.limits = limits;
          },
          error: (err) => {
            console.error('Error fetching limits:', err);
          }
        }); 
        this.addLimitFormm.reset(); // Reset the form after submission
      },
      error: (err) => {
        console.error('Error adding limit:', err);
      }
    });
  }

  deleteLimit(limitId: number) {
    this.transactionService.deleteLimit(limitId).subscribe({
      next: () => {
        this.limits = this.limits.filter(limit => limit.id !== limitId);
      },
      error: (err) => {
        console.error('Error deleting limit:', err);
      }
    });
  }
}
