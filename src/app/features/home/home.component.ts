import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-gray-900 mb-4">Welcome to Bank App</h1>
          <p class="text-xl text-gray-600">Manage your products and settings efficiently</p>
        </div>

        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Products Card -->
          <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
            <div class="bg-blue-500 h-32 flex items-center justify-center">
              <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10l8-4" />
              </svg>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Products</h2>
              <p class="text-gray-600 mb-4">Manage your product inventory and categories</p>
              <div class="space-y-2">
                <a
                  routerLink="/products"
                  class="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Products
                </a>
                <a
                  routerLink="/products/categories"
                  class="block w-full text-center bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition"
                >
                  View Categories
                </a>
              </div>
            </div>
          </div>

          <!-- Settings Card -->
          <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
            <div class="bg-purple-500 h-32 flex items-center justify-center">
              <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
              <p class="text-gray-600 mb-4">Configure your application preferences</p>
              <div class="space-y-2">
                <a
                  routerLink="/settings/general"
                  class="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  General Settings
                </a>
                <a
                  routerLink="/settings/advanced"
                  class="block w-full text-center bg-purple-100 text-purple-600 py-2 rounded-lg hover:bg-purple-200 transition"
                >
                  Advanced Settings
                </a>
              </div>
            </div>
          </div>

          <!-- Documentation Card -->
          <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
            <div class="bg-green-500 h-32 flex items-center justify-center">
              <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.228 6.228 2 10.228 2 15s4.228 8.772 10 8.772c5.772 0 10-3.94 10-8.772 0-4.772-4.228-8.747-10-8.747z" />
              </svg>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Multi-Level Navigation</h2>
              <p class="text-gray-600 mb-4">Explore the app with multi-level routing and breadcrumbs</p>
              <p class="text-sm text-gray-500">
                This app demonstrates how to build complex routing hierarchies with proper breadcrumb navigation. Check the breadcrumb trail at the top as you navigate!
              </p>
            </div>
          </div>
        </div>

        <!-- Info Section -->
        <div class="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">About This Navigation Structure</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">📍 Breadcrumb Navigation</h3>
              <p class="text-gray-600">
                The breadcrumb trail at the top shows your current location in the app hierarchy.
                Each level is clickable to navigate back quickly.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">🗂️ Multi-Level Routing</h3>
              <p class="text-gray-600">
                The app uses Angular's child routing to create a deep navigation structure.
                Routes can be nested up to any level you need.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">⚙️ Settings Management</h3>
              <p class="text-gray-600">
                Settings are organized into different pages - General and Advanced settings
                are at different routes under /settings.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">📦 Product Management</h3>
              <p class="text-gray-600">
                Products can be viewed in list, detail, or by category. Each view maintains
                its breadcrumb trail for easy navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {}
