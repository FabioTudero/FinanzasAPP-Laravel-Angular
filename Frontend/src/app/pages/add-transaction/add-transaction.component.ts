import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  userId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private authService: AuthService
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

  onSubmit() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.userId = user.id;
  
        // Asegurar que user_id se asigna después de obtener el usuario
        const transactionData = {
          ...this.addTransactionForm.value,
          user_id: this.userId
        };

        console.log('Transaction data:', transactionData);

        // Ahora sí, enviar la transacción con el user_id correcto
        this.transactionService.addTransaction(transactionData).subscribe({
          next: (response) => {

          },
          error: (err) => {
            console.error('Error adding transaction:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }
  

}
