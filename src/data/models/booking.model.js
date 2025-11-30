// import mongoose from "mongoose";

// const BookingSchema = new mongoose.Schema({
//     listings: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     from: { type: Date, required: true },
//     to: { type: Date, required: true },
//     total: { type: Number },
//     status: { type: String, enum: ['created', 'confirmed', 'cancelled'], default: 'created' },
// }, { timestamps: true });

// export default mongoose.model('Booking', BookingSchema);