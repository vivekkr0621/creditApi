import { Component } from '@angular/core';
import { LoanDetails } from '../loan-details/loan-details';

@Component({
  selector: 'app-loan-home',
  imports: [LoanDetails],
  templateUrl: './loan-home.html',
  styleUrl: './loan-home.scss'
})
export class LoanHome {

}
