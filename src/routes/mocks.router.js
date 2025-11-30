// import express from 'express';
// import { generateListing, generateUser } from '../mocking/generator.js';
// import User from '../data/models/user.model.js';
// import ListingModel from '../data/models/listing.model.js'; // Por crear el modelo Listing aún
// import logger from '../logger/logger.js';

// const router = express.Router();

// router.get('/mockinglistings', (req, res) => {
//     const n = Number(req.query.n) || 100;
//     const arr = Array.from({ length: n }, () => generateListing());
//     res.json(arr);
// });

// router.get('/mockingusers', async (req, res) => {
//     const n = Number(req.query.n) || 50;
//     const users = [];
//     for (let i = 0; i < n; i++) users.push(await generateUser());
//     res.json(users);
// })

// router.post('/generateData', async (req, res) => {
//     try {
//         const { users = 0, listings = 0 } = req.body;
//         const inserted = { users: 0, listings: 0 };

//         if (users > 0) {
//             const arr = [];
//             for (let i = 0; i < users; i++) arr.push(await generateUser());
//             const r = await ListingModel.insertMany(arr);
//             inserted.listings = r.length;
//         }

//         logger.info(`Inserted mock data users:${inserted.users} listings: ${inserted.listings}`);
//         res.json({ ok: true, inserted });
//     } catch (err) {
//         logger.error('error generating data', err);
//         res.status(500).json({ error: 'Error inserting mock data' });
//     }
// });

// router.get('/loggerTest', (req, res) => {
//     logger.debug('debug test');
//     logger.http && logger.http('http test');
//     logger.info('info test');
//     logger.warning && logger.warning('warning test');
//     logger.error('error test');
//     logger.fatal && logger.fatal('fatal test');
//     res.json({ ok: true, msg: 'Logger test executed' });
// })

// export default router;