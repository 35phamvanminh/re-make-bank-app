import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../shared/services';

@Component({
  selector: 'app-settings-advanced',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Advanced Settings</h1>
          <p class="text-gray-600">Technical configuration options for power users</p>
        </div>

        <!-- Advanced Settings Form -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- API Settings -->
            <div class="border-b pb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">⚙️ API Settings</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    API Endpoint
                  </label>
                  <!-- [(ngModel)]="settings.apiEndpoint" -->
                  <input
                    type="text"
                    name="apiEndpoint"
                    placeholder="https://api.example.com"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                  />
                  <p class="text-xs text-gray-500 mt-1">Base URL for API requests</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Request Timeout (ms)
                  </label>
                  <!-- [(ngModel)]="settings.requestTimeout" -->
                  <input
                    type="number"
                    name="requestTimeout"
                    min="1000"
                    step="1000"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Max Retry Attempts
                  </label>
                  <!-- [(ngModel)]="settings.maxRetries" -->
                  <input
                    type="number"
                    name="maxRetries"
                    min="0"
                    max="10"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <!-- Cache Settings -->
            <div class="border-b pb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">💾 Cache Settings</h2>
              
              <div class="space-y-3">
                <label class="flex items-center">
                    <!-- [(ngModel)]="settings.enableCache" -->
                  <input
                    type="checkbox"
                    name="enableCache"
                    class="h-4 w-4 text-purple-600"
                  />
                  <span class="ml-3 text-gray-700">Enable response caching</span>
                </label>

                <label class="flex items-center">
                    <!-- [(ngModel)]="settings.persistCache" -->
                  <input
                    type="checkbox"
                    name="persistCache"
                    class="h-4 w-4 text-purple-600 disabled:opacity-50"
                  />
                  <span class="ml-3 text-gray-700 disabled:opacity-50">Persist cache to local storage</span>
                </label>

                <div class="ml-8">
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Cache Duration (minutes)
                  </label>
                  <!-- [(ngModel)]="settings.cacheDuration" -->
                  <input
                    type="number"
                    name="cacheDuration"
                    min="1"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <!-- Logging & Debug -->
            <div class="border-b pb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">🐛 Logging & Debug</h2>
              
              <div class="space-y-3">
                <label class="flex items-center">
                  <!-- [(ngModel)]="settings.enableLogging" -->
                  <input
                    type="checkbox"
                    name="enableLogging"
                    class="h-4 w-4 text-purple-600"
                  />
                  <span class="ml-3 text-gray-700">Enable detailed logging</span>
                </label>

                <label class="flex items-center">
                    <!-- [(ngModel)]="settings.debugMode" -->
                  <input
                    type="checkbox"
                    name="debugMode"
                    class="h-4 w-4 text-purple-600"
                  />
                  <span class="ml-3 text-gray-700">Enable debug mode</span>
                </label>

                <label class="flex items-center">
                    <!-- [(ngModel)]="settings.showPerformanceMetrics" -->
                  <input
                    type="checkbox"
                    name="showPerformanceMetrics"
                    class="h-4 w-4 text-purple-600"
                  />
                  <span class="ml-3 text-gray-700">Show performance metrics</span>
                </label>
              </div>
            </div>

            <!-- Data Management -->
            <div class="pb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">🗑️ Data Management</h2>
              
              <div class="space-y-4">
                <button
                  type="button"
                  (click)="clearCache()"
                  class="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition font-semibold"
                >
                  Clear All Cache
                </button>

                <button
                  type="button"
                  (click)="exportData()"
                  class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Export Data
                </button>

                <button
                  type="button"
                  (click)="resetAll()"
                  class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Reset All Settings
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                class="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                Save Advanced Settings
              </button>
              <button
                type="button"
                (click)="onReset()"
                class="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <!-- Warning Box -->
        <div class="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <p class="text-red-900 font-semibold mb-2">⚠️ Warning</p>
          <p class="text-red-900 text-sm">
            Advanced settings affect application performance and stability. 
            Only modify these settings if you understand the implications.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsAdvancedComponent {
  private toast = inject(ToastService);

  settings = signal({
    apiEndpoint: 'https://api.example.com',
    requestTimeout: 30000,
    maxRetries: 3,
    enableCache: true,
    persistCache: true,
    cacheDuration: 5,
    enableLogging: true,
    debugMode: false,
    showPerformanceMetrics: true
  });

  private defaultSettings = {
    apiEndpoint: 'https://api.example.com',
    requestTimeout: 30000,
    maxRetries: 3,
    enableCache: true,
    persistCache: true,
    cacheDuration: 5,
    enableLogging: true,
    debugMode: false,
    showPerformanceMetrics: true
  };

  onSubmit(): void {
    this.toast.success('Advanced settings saved successfully!');
    console.log('Advanced Settings:', this.settings());
  }

  onReset(): void {
    this.settings.set({ ...this.defaultSettings });
    this.toast.info('Advanced settings reset to defaults');
  }

  clearCache(): void {
    this.toast.success('Cache cleared successfully');
    console.log('Cache cleared');
  }

  exportData(): void {
    this.toast.success('Data exported successfully');
    console.log('Data exported:', this.settings());
  }

  resetAll(): void {
    if (confirm('Are you sure you want to reset all settings? This action cannot be undone.')) {
      this.settings.set({ ...this.defaultSettings });
      this.toast.success('All settings have been reset');
    }
  }
}
