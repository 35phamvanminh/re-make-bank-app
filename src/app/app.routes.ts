import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then(m => m.HomeComponent),
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'products',
    data: { breadcrumb: 'Products' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/products/components/product-list/product-list.component').then(
            m => m.ProductListComponent
          ),
        data: { breadcrumb: 'List' }
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/products/components/product-detail/product-detail.component').then(
            m => m.ProductDetailComponent
          ),
        data: { breadcrumb: 'Detail' }
      },
      {
        path: 'categories',
        data: { breadcrumb: 'Categories' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/products/components/product-categories/product-categories.component').then(
                m => m.ProductCategoriesComponent
              ),
            data: { breadcrumb: 'List' }
          },
          {
            path: ':categoryId',
            loadComponent: () =>
              import('./features/products/components/product-category-detail/product-category-detail.component').then(
                m => m.ProductCategoryDetailComponent
              ),
            data: { breadcrumb: 'Detail' }
          }
        ]
      }
    ]
  },
  {
    path: 'settings',
    data: { breadcrumb: 'Settings' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/settings/settings-overview.component').then(
            m => m.SettingsOverviewComponent
          ),
        data: { breadcrumb: 'Overview' }
      },
      {
        path: 'general',
        loadComponent: () =>
          import('./features/settings/settings-general.component').then(
            m => m.SettingsGeneralComponent
          ),
        data: { breadcrumb: 'General' }
      },
      {
        path: 'advanced',
        loadComponent: () =>
          import('./features/settings/settings-advanced.component').then(
            m => m.SettingsAdvancedComponent
          ),
        data: { breadcrumb: 'Advanced' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
