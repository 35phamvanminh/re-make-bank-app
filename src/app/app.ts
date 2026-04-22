import { Component, signal } from '@angular/core';
import { ToastComponent, BreadcrumbComponent } from './shared/components';
import { ProductListComponent } from './features/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, ToastComponent, BreadcrumbComponent],
  template: `
    <app-breadcrumb></app-breadcrumb>
    <app-product-list></app-product-list>
    <app-toast></app-toast>
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
