// Esto si rompe la App después se puede modificar trayendo el código anterior

import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  images: [String],
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

ProductSchema.plugin(mongoosePaginate);
export default mongoose.model('Product', ProductSchema);