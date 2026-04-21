# Project Structure Reorganization

## New Folder Structure

```
src/app/
├── app.ts                          (Root component)
├── app.routes.ts                   (Routes config)
├── app.config.ts                   (App configuration)
├── app.html
├── app.css
│
├── shared/                         (Shared components & services)
│   ├── components/
│   │   ├── loading.component.ts
│   │   ├── toast.component.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── toast.service.ts
│   │   └── index.ts
│   └── models/
│       └── index.ts
│
└── features/                       (Feature modules)
    └── products/                   (Products feature)
        ├── models/
        │   ├── products.model.ts
        │   └── index.ts
        ├── services/
        │   ├── products.service.ts
        │   └── index.ts
        ├── store/
        │   ├── products.store.ts
        │   └── index.ts
        ├── components/
        │   ├── product-list/
        │   │   └── product-list.component.ts
        │   ├── product-form/
        │   │   └── product-form.component.ts
        │   └── index.ts
        └── index.ts
```

## Import Examples

### In Components
```typescript
// From features
import { ProductListComponent } from './features/products';
import { ProductsStore } from './features/products';

// From shared
import { ToastComponent, LoadingComponent } from './shared/components';
import { ToastService } from './shared/services';
```

### Root Component
```typescript
// Old
import { ToastComponent } from './toast.component';
import { ProductListComponent } from './product-list.component';

// New
import { ToastComponent } from './shared/components';
import { ProductListComponent } from './features/products';
```

## Benefits

1. **Scalability**: Easy to add new features (just create a new folder in `/features`)
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Shared components/services are isolated in `/shared`
4. **Organization**: Services, models, and components are organized by feature
5. **Easier Testing**: Modular structure makes unit testing simpler

## Old Files (to be deleted)
- loading.component.ts
- toast.component.ts
- toast.service.ts
- products.model.ts
- products.service.ts
- products.store.ts
- product-form.component.ts
- product-list.component.ts
- app-*.html files (test files)
