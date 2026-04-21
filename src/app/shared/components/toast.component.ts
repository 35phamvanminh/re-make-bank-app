import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          [ngClass]="{
            'bg-green-100 text-green-800 border-green-300': toast.type === 'success',
            'bg-red-100 text-red-800 border-red-300': toast.type === 'error',
            'bg-blue-100 text-blue-800 border-blue-300': toast.type === 'info',
            'bg-yellow-100 text-yellow-800 border-yellow-300': toast.type === 'warning'
          }"
          class="border px-4 py-3 rounded-lg shadow-lg animate-slide-in"
        >
          <p class="font-semibold">
            @switch(toast.type) {
              @case('success') { ✓ }
              @case('error') { ✕ }
              @case('info') { ℹ }
              @case('warning') { ⚠ }
            }
            {{ toast.message }}
          </p>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
  `],
})
export class ToastComponent {
  toastService = inject(ToastService);
}
