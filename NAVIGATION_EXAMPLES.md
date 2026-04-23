# 🎯 Complete Navigation Examples

## Example 1: Product List to Product Detail

### File: `src/app/features/products/components/product-list/product-list.component.html`

```html
<!-- View Button in Product List -->
<a
  [routerLink]="['/products', product.id]"
  class="flex-1 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
>
  View
</a>
```

### What Happens:
1. User clicks "View" on a product
2. Router navigates to `/products/productId123`
3. `ProductDetailComponent` loads
4. **Breadcrumb Trail**: `Home / Products / List / Product Name`
5. Product detail page displays with full information

---

## Example 2: Products to Categories

### File: `src/app/features/products/components/product-list/product-list.component.html`

```html
<!-- Categories Button in Header -->
<a
  routerLink="/products/categories"
  class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
>
  📁 Categories
</a>
```

### What Happens:
1. User clicks "Categories" button
2. Router navigates to `/products/categories`
3. `ProductCategoriesComponent` loads and displays all categories
4. **Breadcrumb Trail**: `Home / Products / Categories`
5. Each category card shows product count and total value

---

## Example 3: Browse Products by Category

### File: `src/app/features/products/components/product-categories/product-categories.component.ts`

```html
<!-- Category Card with Link -->
<a
  [routerLink]="['/products/categories', categoryGroup.category.toLowerCase()]"
  class="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg"
>
  View Products →
</a>
```

### What Happens:
1. User clicks "View Products" on a category
2. Router navigates to `/products/categories/electronics`
3. `ProductCategoryDetailComponent` loads
4. Filters and displays all products in that category
5. **Breadcrumb Trail**: `Home / Products / Categories / Electronics`
6. Shows category statistics (avg price, total stock, etc.)

---

## Example 4: Programmatic Navigation in Component

### File: `src/app/features/products/components/product-detail/product-detail.component.ts`

```typescript
export class ProductDetailComponent {
  constructor(private router: Router) {}

  goBack(): void {
    // Navigate back to products list
    this.router.navigate(['/products']);
  }

  goToCategory(): void {
    // Navigate to a specific category
    this.router.navigate(['/products/categories', this.product.category]);
  }

  goHome(): void {
    // Navigate to home
    this.router.navigate(['/']);
  }
}
```

### Usage in Template:
```html
<button (click)="goBack()" class="back-button">
  ← Back to Products
</button>

<button (click)="goToCategory()" class="category-button">
  View Other {{ product.category }} Products
</button>
```

---

## Example 5: Settings Navigation

### File: `src/app/features/settings/settings-overview.component.ts`

```html
<!-- Navigate to Different Settings Pages -->
<a
  routerLink="/settings/general"
  class="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg"
>
  Configure →
</a>

<a
  routerLink="/settings/advanced"
  class="inline-block w-full text-center bg-purple-600 text-white py-2 rounded-lg"
>
  Configure →
</a>
```

### Breadcrumb Trail Examples:
- `/settings` → `Home / Settings / Overview`
- `/settings/general` → `Home / Settings / General`
- `/settings/advanced` → `Home / Settings / Advanced`

---

## Example 6: Extract Route Parameters

### File: `src/app/features/products/components/product-detail/product-detail.component.ts`

```typescript
import { ActivatedRoute } from '@angular/router';

export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService
  ) {}

  ngOnInit(): void {
    // Get the :id parameter from URL
    this.route.params.subscribe(params => {
      const productId = params['id'];
      
      // Load product data
      this.service.getProductById(productId).subscribe(product => {
        this.product = product;
      });
    });
  }
}
```

### Usage:
- URL: `/products/123`
- `params['id']` = `"123"`
- Loads product with ID 123

---

## Example 7: Query Parameters for Filters

### File: Usage Example

```typescript
// Navigate with query parameters
this.router.navigate(
  ['/products'],
  { queryParams: { category: 'electronics', sort: 'price' } }
);

// URL becomes: /products?category=electronics&sort=price

// Read query parameters
this.route.queryParams.subscribe(params => {
  const category = params['category']; // 'electronics'
  const sort = params['sort']; // 'price'
});
```

---

## Example 8: Clickable Breadcrumb Navigation

### File: `src/app/shared/components/breadcrumb/breadcrumb.component.ts`

```html
<!-- Breadcrumb Trail -->
<nav class="breadcrumb">
  <ol class="flex items-center space-x-2">
    @for (item of breadcrumbService.breadcrumbs(); let last = $last; let idx = $index; track idx) {
      <li class="flex items-center">
        @if (idx > 0) {
          <span class="text-gray-400 mx-2">/</span>
        }
        
        @if (last) {
          <!-- Current page - not clickable -->
          <span class="text-gray-900 font-medium">{{ item.label }}</span>
        } @else {
          <!-- Previous pages - clickable -->
          <a [routerLink]="item.url" class="text-blue-600 hover:underline">
            {{ item.label }}
          </a>
        }
      </li>
    }
  </ol>
</nav>
```

### Example Trail: `/products/123/reviews`
```
Home / Products / Detail / Reviews
 ↓       ↓        ↓       ↓ (current - not clickable)
 |       |        |       └─ Reviews
 |       |        └─────────── Clicking "Detail" goes to /products/123
 |       └─────────────────────── Clicking "Products" goes to /products
 └───────────────────────────────── Clicking "Home" goes to /
```

---

## Example 9: Dynamic Breadcrumbs with Product Name

### Scenario:
User navigates to `/products/123` (MacBook Pro 16")

### Desired Breadcrumb:
`Home / Products / List / MacBook Pro 16"`

### Implementation:

```typescript
// In ProductDetailComponent
export class ProductDetailComponent implements OnInit {
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    // Load product
    this.service.getProductById(productId).subscribe(product => {
      this.product = product;
      
      // Update breadcrumb with dynamic product name
      this.breadcrumbService.setBreadcrumbs([
        { label: 'Products', url: '/products' },
        { label: product.name, url: `/products/${product.id}` }
      ]);
    });
  }
}
```

---

## Example 10: Complete Navigation Flow

### User Journey: Home → Category → Product Detail → Edit → Save → Back to List

```
1. START: Home Page (/)
   Breadcrumb: Home

2. CLICK: "Products" Card
   Navigate to: /products
   Breadcrumb: Home / Products / List

3. CLICK: "Categories" Button
   Navigate to: /products/categories
   Breadcrumb: Home / Products / Categories

4. CLICK: "Electronics" Category Card
   Navigate to: /products/categories/electronics
   Breadcrumb: Home / Products / Categories / Electronics

5. CLICK: "View" on MacBook Pro Product Card
   Navigate to: /products/1
   Breadcrumb: Home / Products / Categories / Electronics / Product Detail

6. CLICK: "Edit Product" Button
   Open modal or navigate to: /products/1/edit
   Breadcrumb: Home / Products / Categories / Electronics / Product Detail / Edit

7. FILL FORM: Update product information
   No navigation change

8. CLICK: "Save" Button
   Save product data
   Navigate back to: /products/1
   Breadcrumb: Home / Products / Categories / Electronics / Product Detail

9. CLICK: Back Button in Breadcrumb
   Click "Categories" in breadcrumb
   Navigate to: /products/categories
   Breadcrumb: Home / Products / Categories
```

---

## Example 11: Navigation Guards (Advanced)

### Prevent Unauthorized Access

```typescript
// In app.routes.ts
{
  path: 'settings/advanced',
  canActivate: [adminGuard],
  loadComponent: () => import('./settings-advanced.component')
}

// Create the guard
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard = () => {
  const router = inject(Router);
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
```

---

## Example 12: Relative Route Navigation

### Navigate Relative to Current Route

```typescript
// In ProductDetailComponent
export class ProductDetailComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToReviews(): void {
    // Navigate to reviews page relative to current route
    // From /products/123 → /products/123/reviews
    this.router.navigate(['reviews'], { relativeTo: this.route });
  }

  goUp(): void {
    // Go up one level in route hierarchy
    // From /products/123/reviews → /products/123
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
```

---

## Tips for Best Navigation UX

### ✅ Do:
- Always provide clear breadcrumb trails
- Use meaningful route names in breadcrumbs
- Make breadcrumbs clickable for quick navigation
- Show loading states during navigation
- Preserve user's scroll position when possible
- Provide "Back" buttons in addition to breadcrumbs

### ❌ Don't:
- Use query parameters for critical data
- Navigate without updating breadcrumbs
- Create routes that are too deeply nested (>4 levels)
- Force full page reloads for navigation
- Leave users confused about their location in the app

---

## Summary

This comprehensive example set shows:
1. ✅ Basic route navigation with links
2. ✅ Programmatic navigation with router
3. ✅ Parameter extraction from URLs
4. ✅ Breadcrumb generation and updating
5. ✅ Clickable breadcrumb trails
6. ✅ Dynamic breadcrumb content
7. ✅ Complex user journeys
8. ✅ Route guards for security
9. ✅ Relative navigation
10. ✅ UX best practices

Use these patterns as templates for building your own navigation flows!
