import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p class="text-gray-600">Manage your application settings and preferences</p>
        </div>

        <!-- Settings Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- General Settings -->
          <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
            <div class="bg-gradient-to-br from-blue-400 to-blue-600 h-24 flex items-center justify-center">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">General Settings</h2>
              <p class="text-gray-600 mb-4">Basic configuration options for your account</p>
              <a
                routerLink="/settings/general"
                class="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Configure →
              </a>
            </div>
          </div>

          <!-- Advanced Settings -->
          <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
            <div class="bg-gradient-to-br from-purple-400 to-purple-600 h-24 flex items-center justify-center">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Advanced Settings</h2>
              <p class="text-gray-600 mb-4">Advanced configuration for power users</p>
              <a
                routerLink="/settings/advanced"
                class="inline-block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                Configure →
              </a>
            </div>
          </div>
        </div>

        <!-- Info Section -->
        <div class="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">📋 Settings Overview</h2>
          <div class="space-y-4 text-gray-600">
            <p>
              This page demonstrates how settings can be organized into multiple sections using
              Angular's child routing. Each settings page is at a different route level.
            </p>
            <p>
              <strong>General Settings</strong> contains basic configuration options that most
              users would need to access frequently.
            </p>
            <p>
              <strong>Advanced Settings</strong> contains more technical options for users who
              want more control over the application behavior.
            </p>
            <p>
              Notice how the breadcrumb trail changes as you navigate between different setting pages,
              making it easy to understand the navigation hierarchy.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsOverviewComponent {}
