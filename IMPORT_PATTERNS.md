# Import Patterns - Quick Reference

## 1. Importing Components

### From Shared Components
```typescript
// Specific import
import { LoadingComponent, ToastComponent } from '../shared/components';

// Or individual
import { LoadingComponent } from '../shared/components/loading.component';
```

### From Feature Components
```typescript
// Main feature export
import { ProductListComponent, ProductFormComponent } from './features/products';

// Or specific component
import { ProductListComponent } from './features/products/components';
```

## 2. Importing Services

### From Shared Services
```typescript
import { ToastService } from './shared/services';
```

### From Feature Services
```typescript
import { ProductsService } from './features/products/services';
```

## 3. Importing Store

```typescript
import { ProductsStore } from './features/products/store';
```

## 4. Importing Models

### From Feature Models
```typescript
import { Product, CreateProductPayload } from './features/products/models';
```

## 5. Relative Imports (Within Components)

### In product-list.component.ts
```typescript
// To models (up 2 levels, then to models)
import { Product } from '../../models';

// To store (up 2 levels, then to store)
import { ProductsStore } from '../../store';

// To shared services (up 4 levels, then to shared)
import { ToastService } from '../../../../shared/services';

// To shared components (up 4 levels, then to shared)
import { LoadingComponent } from '../../../../shared/components';

// To sibling component
import { ProductFormComponent } from '../product-form/product-form.component';
```

## 6. Index.ts Files (Barrel Exports)

### shared/components/index.ts
```typescript
export * from './loading.component';
export * from './toast.component';
```

### shared/services/index.ts
```typescript
export * from './toast.service';
```

### features/products/index.ts
```typescript
export * from './models';
export * from './services';
export * from './store';
export * from './components';
```

## Adding New Files

### New Component in Products Feature
Create: `src/app/features/products/components/product-detail/product-detail.component.ts`

Update: `src/app/features/products/components/index.ts`
```typescript
export * from './product-form/product-form.component';
export * from './product-list/product-list.component';
export * from './product-detail/product-detail.component'; // Add this
```

### New Feature Module
Create new folder structure:
```
src/app/features/users/
├── models/
│   └── user.model.ts
├── services/
│   └── user.service.ts
├── store/
│   └── user.store.ts
├── components/
│   ├── user-list/
│   └── user-form/
└── index.ts
```

## Import Path Rules

| Location | Import From | Example |
|----------|-------------|---------|
| App.ts | Feature root | `import { ProductListComponent } from './features/products'` |
| Feature component | Feature root | `import { ProductsStore } from '../../store'` |
| Feature component | Shared | `import { ToastService } from '../../../../shared/services'` |
| Shared component | Shared services | `import { ToastService } from '../services'` |

---

**Use index.ts barrel exports to keep imports clean and maintainable!**
