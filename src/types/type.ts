export interface Product {
  _id: string; // MongoDB ObjectId as string
  name: string;
  description: string;
  category: string;
  unit_price: number;
  quantity_available: number;
  created_at: Date;
  updated_at: Date;
}
