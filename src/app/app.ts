import { Component, signal } from '@angular/core';
import { ToastComponent } from './shared/components';
import { ProductListComponent } from './features/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
