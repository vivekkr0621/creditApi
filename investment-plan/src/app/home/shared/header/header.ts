import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { ToastService } from '../../../services/toast';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  selectedTabIndex = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) { }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    // You can add tab-specific logic here later
  }

  onLogout(): void {
    this.authService.logout();
    this.toast.success('Logged out successfully');
    this.router.navigate(['/login']);
  }

}
