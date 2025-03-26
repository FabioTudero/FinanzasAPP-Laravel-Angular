export interface Transaction {
    id: number;
    category: string;
    amount: number;
    type: 'INCOME' | 'EXPRENSE';
    description: string;
    date: string;
}