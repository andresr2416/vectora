export interface Transaction {
    originAccountId: number;
    destinationAccountId: number;
    amount: number;
    description: string;
    transactionType: string; 
    timestamp: string; 
  }