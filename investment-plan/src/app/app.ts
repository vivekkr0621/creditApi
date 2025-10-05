import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './home/shared/header/header';
import { FooterComponent } from './home/shared/footer/footer';
import { MaterialModule } from './home/shared/material.module';
import { CommonModule } from '@angular/common';
import { LeftSidebar } from './home/shared/left-sidebar/left-sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    LeftSidebar
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('investment-plan');
}
