export interface LoanCalculation {
  principalAmount: number;
  emi: number;
  interestAmount: number;
  totalAmount: number;
}

export interface Investment {
  totalInvestment: number;
  maturityAmount: number;
}