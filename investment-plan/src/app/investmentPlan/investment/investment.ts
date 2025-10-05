import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../home/shared/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoanCalculation, Investment } from '../../models/investment.model';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './investment.html',
  styleUrl: './investment.scss'
})
export class InvestmentComponent implements OnInit {
  loanForm: FormGroup;
  loanCalculation = {
    principalAmount: 0,
    emi: 0,
    interestAmount: 0,
    totalAmount: 0
  };
  fdInvestment = {
    totalInvestment: 0,
    maturityAmount: 0
  };
  fdAnnualInvestment = {
    totalInvestment: 0,
    maturityAmount: 0
  };
  monthlyInvestment = {
    totalInvestment: 0,
    maturityAmount: 0
  };

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      loanAmount: [100000],
      interestRate: [10],
      tenure: [5]
    });
  }

  private valueChangesSubscription: any;

  ngOnInit() {
    // Use debounceTime to limit calculations
    this.valueChangesSubscription = this.loanForm.valueChanges.pipe(
      debounceTime(300) // Wait for 300ms of no changes before calculating
    ).subscribe(() => {
      this.calculateLoan();
      this.calculateFDInvestment();
      this.calculateFDInvestmentYearly();
      this.calculateInvestmentMonthly();

    });

    // Initial calculation
    this.calculateLoan();
    this.calculateFDInvestment();
    this.calculateFDInvestmentYearly();
    this.calculateInvestmentMonthly();
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  private calculateLoan() {
    const amount = this.loanForm.get('loanAmount')?.value || 0;
    const rate = this.loanForm.get('interestRate')?.value || 0;
    const years = this.loanForm.get('tenure')?.value || 0;

    const principalAmount = amount;
    let interestAmount = (amount * rate * years) / 100;
    let emi = 0;
    if (amount != 0 && rate != 0 && years != 0)
      emi = this.calculateEMI(amount, rate, years);
    interestAmount = (emi * years * 12) - principalAmount;
    let totalAmount = principalAmount + interestAmount;

    this.loanCalculation = {
      principalAmount,
      emi,
      interestAmount,
      totalAmount
    };
  }

  private calculateEMI(principal: number, annualInterestRate: number, tenureYears: number): number {
    const monthlyRate = annualInterestRate / 12 / 100;
    const tenureMonths = tenureYears * 12;

    let emi: number;

    if (monthlyRate === 0) {
      emi = principal / tenureMonths;
    } else {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    }

    return parseFloat(emi.toFixed(2));
  }

  private calculateFDInvestment() {
    const years = this.loanForm.get('tenure')?.value || 0;
    const fdRate = 6.5;
    const targetAmount = this.loanCalculation.totalAmount;

    // Using FV = P(1 + r)^t formula backwards to find P
    // where FV is target amount, r is interest rate, t is time in years
    let investment = this.calculatePrincipal(targetAmount, fdRate, years);

    this.fdInvestment = {

      totalInvestment: investment,
      maturityAmount: targetAmount
    };
  }

  private calculateFDInvestmentYearly() {
    const years = this.loanForm.get('tenure')?.value || 0;
    const fdRate = 6.5;
    const targetAmount = this.loanCalculation.totalAmount;

    let investment = this.calculateAnnualInvestment(targetAmount, fdRate, years);

    this.fdAnnualInvestment = {

      totalInvestment: investment,
      maturityAmount: targetAmount
    };
  }

  private calculateInvestmentMonthly() {
    const years = this.loanForm.get('tenure')?.value || 0;
    const fdRate = 6.5;
    const targetAmount = this.loanCalculation.totalAmount;

    let investment = this.calculateMonthlyInvestment(targetAmount, fdRate, years);

    this.monthlyInvestment = {

      totalInvestment: investment,
      maturityAmount: targetAmount
    };
  }

  private calculatePrincipal(finalAmount: number, rate: number, years: number, compounding: number = 4): number {
    const r = rate / 100;
    const factor = Math.pow(1 + (r / compounding), compounding * years);
    const principal = finalAmount / factor;
    return Math.round(principal);
  }

  private calculateAnnualInvestment(finalAmount: number, interestRate: number, tenure: number): number {
    const r = interestRate / 100; // convert % to decimal
    const factor = (Math.pow(1 + r, tenure) - 1) / r; // FV of ordinary annuity formula
    const annualInvestment = finalAmount / factor;
    return Math.round(annualInvestment); // rounded to nearest rupee
  }

  private calculateMonthlyInvestment(finalAmount: number, annualRate: number, years: number): number {
    const n = 12; // monthly compounding
    const r = annualRate / 100; // convert % to decimal
    const totalPeriods = n * years; // total months
    const monthlyRate = r / n;

    // Future Value of ordinary annuity formula
    const factor = (Math.pow(1 + monthlyRate, totalPeriods) - 1) / monthlyRate;
    const monthlyInvestment = finalAmount / factor;

    return Math.round(monthlyInvestment); // rounded to nearest rupee
  }
}
