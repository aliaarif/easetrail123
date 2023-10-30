import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    status: { type: String, required: false, trim: true }
})
productSchema.set('timestamps', true)
const ProductModel = mongoose.model('product', productSchema)
export default ProductModel