import { Component, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Product, CreateProductPayload } from '../../models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  product = input<Product | null>(null);
  isEdit = input(false);
  submit = output<CreateProductPayload>();
  cancel = output();

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    category: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    image: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.product()) {
      this.form.patchValue(this.product()!);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value as CreateProductPayload);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
