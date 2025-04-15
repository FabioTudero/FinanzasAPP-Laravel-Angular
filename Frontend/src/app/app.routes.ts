import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'add-transaction', loadComponent: () => import('./pages/add-transaction/add-transaction.component').then(m => m.AddTransactionComponent) },
            { path: 'balance-per-month', loadComponent: () => import('./pages/balance-per-month/balance-per-month.component').then(m => m.BalancePerMonthComponent) },
            { path: 'limit-per-category', loadComponent: () => import('./pages/limit-per-category/limit-per-category.component').then(m => m.LimitPerCategoryComponent) },
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegisterComponent
    }
];
