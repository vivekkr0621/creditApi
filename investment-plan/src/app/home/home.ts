import { Component } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  constructor(public authService: AuthService) { }

}
