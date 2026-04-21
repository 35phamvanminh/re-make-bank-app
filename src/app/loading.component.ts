import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen">
      <div class="flex flex-col items-center gap-4">
        <!-- Spinner -->
        <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p class="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  `,
})
export class LoadingComponent {}
