import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../home/shared/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-loan-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
  templateUrl: './loan-details.html',
  styleUrl: './loan-details.scss',
  standalone: true
})

export class LoanDetails {
  // model bindings for Scenario A
  priceA = 1300000;
  downA = 300000;
  loanA = 1000000;
  rateA = 8.5;
  tenureA = 5;
  salaryA = 120000;
  expenseA = 50000;
  homeA = 40000;
  // scenario B
  priceB = 1300000;
  downB = 300000;
  loanB = 1000000;
  rateB = 8.5;
  tenureB = 5;
  salaryB = 120000;
  expenseB = 50000;
  homeB = 40000;

  compareMode = false;
  resultsHtml = '';

  toggleCompare(ev: any) {
    this.compareMode = ev.target.checked;
  }

  calculate(prefix: 'A' | 'B') {
    const p = prefix === 'A' ? {
      price: this.priceA, down: this.downA, loan: this.loanA, rate: this.rateA,
      tenure: this.tenureA, salary: this.salaryA, expense: this.expenseA, home: this.homeA
    } : {
      price: this.priceB, down: this.downB, loan: this.loanB, rate: this.rateB,
      tenure: this.tenureB, salary: this.salaryB, expense: this.expenseB, home: this.homeB
    };
    const emi = this.calcEMI(p.loan, p.rate, p.tenure);
    const totalPayment = emi * p.tenure * 12;
    const totalInterest = totalPayment - p.loan;
    const available = p.salary - p.expense - p.home - emi;
    const sip = available > 0 ? Math.round(available * 0.67) : 0;
    const fd = available > 0 ? Math.round(available * 0.33) : 0;

    // build projection
    let projection: any[] = [];
    let investValue = 0;
    let loanBalance = p.loan;
    for (let y = 1; y <= p.tenure; y++) {
      investValue = (investValue + (sip + fd) * 12) * 1.1;
      loanBalance -= p.loan / p.tenure;
      projection.push({ year: y, investValue: Math.round(investValue), loanBalance: Math.round(loanBalance) });
    }

    this.resultsHtml = this.buildResultHtml(prefix, Math.round(emi), Math.round(totalInterest), Math.round(totalPayment), projection);
  }

  calcEMI(loan: number, rate: number, tenureYears: number) {
    const r = rate / 100 / 12;
    const n = tenureYears * 12;
    const pow = Math.pow(1 + r, n);
    if (pow === 1) return loan / n;
    return (loan * r * pow) / (pow - 1);
  }

  buildResultHtml(prefix: string, emi: number, interest: number, total: number, projection: any[]) {
    let html = `<h2>Scenario ${prefix} - Results</h2>`;
    html += `<p><b>Monthly EMI:</b> ₹${emi}<br>`;
    html += `<b>Total Payment:</b> ₹${total}<br>`;
    html += `<b>Total Interest:</b> ₹${interest}</p>`;
    html += `<hr><h3>${projection.length}-Year Projection (Simplified Summary)</h3>`;
    html += `<table border='1' cellspacing='0' cellpadding='6'><tr><th>Year</th><th>Investment Value (₹)</th><th>Loan Balance (₹)</th></tr>`;
    projection.forEach(p => {
      html += `<tr><td>${p.year}</td><td>${p.investValue}</td><td>${p.loanBalance}</td></tr>`;
    });
    html += `</table>`;
    html += `<p style='margin-top:10px;color:gray;'>Explanation: EMI is your fixed monthly loan payment. The projection shows how your investments grow and loan reduces year by year. You can compare Scenario A and B to see which gives better long-term balance.</p>`;
    return html;
  }
  downloadExcel() {
    // Placeholder for future implementation
  }
  downloadPDF() {
    // Placeholder for future implementation
  }
}