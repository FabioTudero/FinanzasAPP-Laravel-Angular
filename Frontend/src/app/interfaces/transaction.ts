export interface Transaction {
    id: number;
    category_transaction_id: number;
    amount: number;
    type: 'IMCOME' | 'EXPRENSE';
    description: string;
    date: string;
}