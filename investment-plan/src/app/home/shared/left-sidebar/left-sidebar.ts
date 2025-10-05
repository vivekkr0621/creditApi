import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-left-sidebar',
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss'
})
export class LeftSidebar {
  constructor(public authService: AuthService) { }

}
