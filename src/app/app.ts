import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, ToastComponent],
  template: `<app-product-list></app-product-list>
<app-toast></app-toast>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
