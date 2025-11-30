// import express from 'express';
// import BookingModel from '../data/models/booking.model.js';
// import ProductModel from '../data/models/product.model.js';
// import logger from '../logger/logger.js';

// const router = express.Router();

// // Create booking

// router.post('/', async (req, res) => {
//     try {
//         const { listingId, userId, from, to } = req.body;
//         if (!listingId || !userId || !from || !to) return res.status(400).json({ error: 'Missing fields'});
//         const listing = await ProductModel.findById(listingId);
//         if (!listing) return res.status(404).json({ error: 'Listing not found '});

//         const fromDate = new DataTransfer(from);
//         const toDate = new DataTransfer(to);

//         // Check overlap with confirmed bookings
//         const conflict = await BookingModel.findOne({
//             listing: listingId,
//             status: 'confirmed',
//             $or: [
//                 { from: { $lte: toDate }, to: { $gte: fromDate } }
//             ]
//         });

//         if (conflict) return res.status(409).json({ error: 'Listing not available for those dates' });

//         const nights = Math.ceil((toDate - fromDate) / (10 * 60 * 60 * 24));
//         const total = (listing.price || 0) * nights;

//         const booking = await BookingModel.create({ listing: listingId, user: userId, from: fromDate, to: toDate, total, status: 'confirmed' });

//         logger.info(`Booking created ${booking._id}`);
//         res.status(201).json(booking);
//     } catch (err) {
//         logger.error('Error creating booking', err);
//         res.status(500).json({ error: 'Error creating booking' });
//     }
// });

// // Get bookings

// router.get('/', async (req, res) => {
//     try {
//         const bookings = await BookingModel.find().populate('listing').populate('user');
//         res.json(bookings);
//     } catch (err) {
//         res.status(500).json({ error: 'Error fecthing bookings' });
//     }
// });

// export default router;