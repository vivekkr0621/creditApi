// import { Routes } from '@angular/router';
// import { LoginComponent } from './auth/login/login';
// import { SignupComponent } from './auth/signup/signup';
// import { HomeComponent } from './home/home';
// import { InvestmentComponent } from './investment/investment';
// import { authGuard } from './guards/auth.guard';
// import { LoanHome } from './carLoan/loan-home/loan-home';

// export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
//   { path: 'home', component: HomeComponent, canActivate: [authGuard] },
//   { path: 'investment', component: InvestmentComponent, canActivate: [authGuard] },
//   { path: 'car-loan', component: LoanHome, canActivate: [authGuard] },
//   { path: '**', redirectTo: '/login' }
// ];

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { HomeComponent } from './home/home';
import { InvestmentComponent } from './investmentPlan/investment/investment';
import { authGuard } from './auth/guards/auth.guard';
import { LoanHome } from './carLoan/loan-home/loan-home';
import { environment } from '../environments/environment';

export const routes: Routes = [
  { path: '', redirectTo: environment.production ? '/login' : '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'investment', component: InvestmentComponent, canActivate: [authGuard] },
  { path: 'car-loan', component: LoanHome, canActivate: [authGuard] },
  { path: '**', redirectTo: environment.production ? '/login' : '/car-loan' }
];

