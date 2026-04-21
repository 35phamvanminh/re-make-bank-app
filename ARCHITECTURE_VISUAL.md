# 🎨 CRUD System - Visual Architecture

## 🏗️ Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      App Component                          │
│                    (app.ts - Root)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌────────┐  ┌──────────┐  ┌──────────┐
    │Product │  │   Toast  │  │ Routing  │
    │ List   │  │Component │  │ Module   │
    └────────┘  └──────────┘  └──────────┘
        │
        └─→ [Product Form Modal]
        └─→ [Loading Spinner]
        └─→ [Search Input]
        └─→ [Product Grid]
```

## 🔄 State Management Flow

```
┌────────────────────────────────────────────────────────────┐
│                  ProductsStore (Signal Store)              │
│                                                            │
│  State (Signals):                                         │
│  • products: Product[]                                    │
│  • loading: boolean                                       │
│  • error: string | null                                  │
│  • selectedProduct: Product | null                       │
│  • searchTerm: string                                    │
│                                                          │
│  Computed:                                               │
│  • filteredProducts = products.filter(search)           │
│                                                          │
│  Methods:                                                │
│  • loadProducts()                                         │
│  • createProduct(payload)                                │
│  • updateProduct(payload)                                │
│  • deleteProduct(id)                                     │
│  • setSearchTerm(term)                                   │
│  • clearError()                                          │
│                                                          │
│  Dependencies:                                           │
│  └─→ ProductsService                                     │
└────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Diagram

```
User Interaction
        ↓
ProductListComponent
        ↓
Store Method
    ↙   ↓   ↘
   /    │    \
  /     ↓     \
Sync  Async   Computed
      ↓
ProductsService
      ↓
Observable (with delay)
      ↓
Store Updates Signals
      ↓
Template Re-renders
      ↓
UI Updates
      ↓
Toast Notification
```

## 🔀 CRUD Operation Flows

### CREATE Flow
```
┌─────────────────────────────────────────────────────┐
│ User clicks "+ Add Product" button                  │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ ProductListComponent.openForm()                    │
│ → showForm = true                                  │
│ → editingProduct = null                            │
│ → isEditing = false                                │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ ProductFormComponent renders (Modal)                │
│ → Empty form displayed                              │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ User fills form fields:                             │
│ • Name: "MacBook Pro"                               │
│ • Description: "..."                                │
│ • Price: 1999                                       │
│ • Stock: 25                                         │
│ • Category: "Electronics"                           │
│ • Image: "url"                                      │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ User clicks "Create" button                         │
│ → Form validation passes                            │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ ProductListComponent.handleSubmit(payload)          │
│ → store.createProduct(payload)                      │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ Store: patchState({ loading: true })                │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ ProductsService.createProduct(payload)              │
│ → Simulate API call (800ms delay)                   │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ Store: Update products signal                       │
│ → products = [...products, newProduct]              │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ Store: patchState({ loading: false })               │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ Template auto-detects signal change                 │
│ → Computed filteredProducts updates                 │
│ → Grid re-renders with new product                  │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ ToastService.success(msg)                           │
│ → Toast appears: "Product created successfully!"    │
│ → Auto-disappears after 3 seconds                   │
└────────────────┬──────────────────────────────────┘
                 ▼
┌─────────────────────────────────────────────────────┐
│ ProductListComponent.closeForm()                    │
│ → Modal hidden                                      │
│ → Form reset                                        │
└─────────────────────────────────────────────────────┘
```

### READ Flow
```
Page Loads
    ↓
ProductListComponent constructor
    ↓
effect(() => { store.loadProducts() })
    ↓
patchState({ loading: true })
    ↓
ProductsService.getProducts()
    ↓
Simulate 1s API delay
    ↓
Return 3 mock products
    ↓
patchState({ products, loading: false })
    ↓
Signals update
    ↓
filteredProducts computed signal updates
    ↓
Template re-renders
    ↓
Product cards display in grid
    ↓
Toast: "Products loaded successfully!"
```

### UPDATE Flow
```
User clicks "Edit" on product
    ↓
ProductListComponent.editProduct(product)
    ↓
editingProduct = product
isEditing = true
showForm = true
    ↓
ProductFormComponent renders with data
    ↓
form.patchValue(product)
    ↓
Form pre-fills with current values
    ↓
User modifies fields
    ↓
User clicks "Update"
    ↓
store.updateProduct({id, ...payload})
    ↓
patchState({ loading: true })
    ↓
Service updates (800ms delay)
    ↓
Store updates products array
    ↓
patchState({ loading: false })
    ↓
Template updates (grid shows new data)
    ↓
Toast: "Product updated successfully!"
    ↓
Modal closes
```

### DELETE Flow
```
User clicks "Delete" on product
    ↓
confirm() dialog shows
    ↓
If confirmed:
    ↓
ProductListComponent.deleteProduct(id)
    ↓
store.deleteProduct(id)
    ↓
patchState({ loading: true })
    ↓
Service deletes (600ms delay)
    ↓
Store removes from products array
    ↓
patchState({ loading: false })
    ↓
Template updates (grid re-renders)
    ↓
Toast: "Product deleted successfully!"
```

## 🧩 Component Interaction

```
ProductListComponent
├── Manages: showForm, isEditing, editingProduct
├── Listens to: store.products, store.loading, store.error
├── Calls:
│   ├── store.loadProducts() [on init]
│   ├── store.createProduct() [form submit]
│   ├── store.updateProduct() [form submit]
│   ├── store.deleteProduct() [delete click]
│   ├── store.setSearchTerm() [search input]
│   └── toast service methods
│
└── Contains:
    ├── ProductFormComponent
    │   ├── Input: product, isEdit
    │   ├── Output: submit, cancel
    │   └── Manages: form, validation
    │
    ├── LoadingComponent
    │   └── Shows when store.loading = true
    │
    └── Template
        ├── Search input
        ├── Error banner
        ├── Product grid
        └── Product cards

ToastComponent
├── Listens to: toastService.toasts()
├── Shows: Active toasts
└── Auto-hides: After duration
```

## 📱 Responsive Design Breakpoints

```
Mobile (< 768px)          Tablet (768px - 1024px)    Desktop (> 1024px)
┌──────────────────┐     ┌─────────────────┐         ┌──────────────────┐
│  Product Card 1  │     │ Product Card 1  │ Card 2  │ Card 1 │ Card 2 │ Card 3│
├──────────────────┤     ├─────────────────┤         ├────────┼────────┼─────┤
│  Product Card 2  │     │ Product Card 3  │ Card 4  │ Card 4 │ Card 5 │ Card 6│
├──────────────────┤     └─────────────────┘         └────────┴────────┴─────┘
│  Product Card 3  │
└──────────────────┘

Grid: grid-cols-1    Grid: grid-cols-2         Grid: grid-cols-3
```

## 🎨 Form Modal Structure

```
┌─────────────────────────────────────────┐
│ Dark Overlay (backdrop)                 │
│  ┌───────────────────────────────────┐  │
│  │ White Modal Box                   │  │
│  │                                   │  │
│  │ Add New Product / Edit Product    │  │
│  │                                   │  │
│  │ ┌─────────────────────────────┐  │  │
│  │ │ Product Name                │  │  │
│  │ │ [___________________]       │  │  │
│  │ └─────────────────────────────┘  │  │
│  │                                   │  │
│  │ ┌─────────────────────────────┐  │  │
│  │ │ Description                 │  │  │
│  │ │ [___________________]       │  │  │
│  │ │ [___________________]       │  │  │
│  │ │ [___________________]       │  │  │
│  │ └─────────────────────────────┘  │  │
│  │                                   │  │
│  │ [Other Fields...]                 │  │
│  │                                   │  │
│  │ ┌─────────────┐  ┌──────────────┐│  │
│  │ │   Cancel    │  │    Create    ││  │
│  │ └─────────────┘  └──────────────┘│  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 🎪 Toast Notification Stack

```
Top Right Corner

┌──────────────────────────┐
│ ✓ Product created! (3s)  │ ← Auto-dismiss
├──────────────────────────┤
│ ✕ Failed to delete   (4s)│ ← Error stays longer
└──────────────────────────┘

Colors:
✓ Green   - Success
✕ Red     - Error
ℹ Blue    - Info
⚠ Yellow  - Warning
```

## 🔌 Signal-based Reactivity

```
User Action
    ↓
Component Method
    ↓
Store Method
    ↓
patchState()
    ↓
Signals Update (store.products, store.loading, etc.)
    ↓
Computed Signals Update (filteredProducts)
    ↓
Template Detects Changes (fine-grained reactivity)
    ↓
Only affected parts re-render
    ↓
UI Updates
```

This is why Signals are powerful:
- Only components using that signal re-render
- No Zone.js change detection
- Very fine-grained control
- Better performance

---

## 🧠 Mental Model

Think of it like a river:
```
User Input (Stream)
    ↓
Service (Filters/transforms)
    ↓
Store (Central pool)
    ↓
Components (Drinking from pool)
    ↓
UI (Shows what they drink)
```

Everything is reactive: Change the pool → Everyone sees changes.

