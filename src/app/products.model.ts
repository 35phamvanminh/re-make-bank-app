export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: string;
}
