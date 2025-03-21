export interface Transaction {
    id: number;
    category_transaction_id: number;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    date: string;
}