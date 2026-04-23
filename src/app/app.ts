import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent, BreadcrumbComponent } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, BreadcrumbComponent],
  template: `
    <app-breadcrumb></app-breadcrumb>
    <router-outlet></router-outlet>
    <app-toast></app-toast>
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
