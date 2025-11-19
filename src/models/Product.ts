import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  reference: string;
  description: string;
  size: string[];
  color: string;
  price: number;
  category1?: string;
  category2?: string;
  type?: string;
  features?: any;
}

const ProductSchema: Schema = new Schema({
  reference: { type: String, required: true },
  description: { type: String, default: '' },
  size: { type: [String], default: [] },
  color: { type: String, default: '' },
  price: { type: Number, required: true },
  category1: { type: String },
  category2: { type: String },
  type: { type: String },
  features: { type: Object, default: {} },
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
