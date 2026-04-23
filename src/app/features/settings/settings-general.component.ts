import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../shared/services';

@Component({
  selector: 'app-settings-general',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">General Settings</h1>
          <p class="text-gray-600">Configure basic application settings</p>
        </div>

        <!-- Settings Form -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Account Settings -->
            <div class="border-b pb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">👤 Account Settings</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Username
                  </label>
                  <!-- [(ngModel)]="settings.username" -->
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <!-- [(ngModel)]="settings.email" -->
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Language
                </label>
                <!-- [(ngModel)]="settings.language" -->
                  <select
                    name="language"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Notification Settings -->
            <div class="border-b pb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">🔔 Notification Settings</h2>
              
              <div class="space-y-3">
                <label class="flex items-center">
                    <!-- [(ngModel)]="settings.emailNotifications" -->
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    class="h-4 w-4 text-blue-600"
                  />
                  <span class="ml-3 text-gray-700">Receive email notifications</span>
                </label>

                <label class="flex items-center">
                    <!-- [(ngModel)]="settings.pushNotifications" -->
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    class="h-4 w-4 text-blue-600"
                  />
                  <span class="ml-3 text-gray-700">Enable push notifications</span>
                </label>

                <label class="flex items-center">
                     <!-- [(ngModel)]="settings.weeklyDigest" -->
                  <input
                    type="checkbox"
                   
                    name="weeklyDigest"
                    class="h-4 w-4 text-blue-600"
                  />
                  <span class="ml-3 text-gray-700">Send weekly digest email</span>
                </label>
              </div>
            </div>

            <!-- Display Settings -->
            <div class="pb-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">🎨 Display Settings</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Theme
                  </label>
                    <!-- [(ngModel)]="settings.theme" -->
                  <select
                  
                    name="theme"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Items per page
                  </label>
                   <!-- [(ngModel)]="settings.itemsPerPage" -->
                  <input
                    type="number"
                   
                    name="itemsPerPage"
                    min="5"
                    max="100"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Save Changes
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

        <!-- Information Box -->
        <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p class="text-blue-900">
            ℹ️ These settings are stored in the browser's session. They will be reset when you refresh the page.
            In a real application, these would be saved to a backend server.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsGeneralComponent {
  private toast = inject(ToastService);

  settings = signal({
    username: 'John Doe',
    email: 'john@example.com',
    language: 'en',
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    theme: 'light',
    itemsPerPage: 10
  });

  onSubmit(): void {
    this.toast.success('General settings saved successfully!');
    console.log('Settings:', this.settings());
  }

  onReset(): void {
    this.settings.set({
      username: 'John Doe',
      email: 'john@example.com',
      language: 'en',
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      theme: 'light',
      itemsPerPage: 10
    });
    this.toast.info('Settings reset to defaults');
  }
}
