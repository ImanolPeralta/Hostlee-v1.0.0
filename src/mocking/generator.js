// import { faker } from '@faker-js/faker';
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// export const generateListing = () => ({
//     _id: new mongoose.Types.ObjectId(),
//     title: faker.company.catchPhrase(),
//     description: faker.lorem.paragraph(),
//     price: faker.datatype.number({ min: 20, max: 500 }),
//     host: null,
//     available: true,
//     images: [faker.image.url(), faker.image.url()],
//     createdAt: new Date(),
//     updatedAt: new Date(),
// });

// export const generateUser = async () => {
//     const password = await bcrypt.hash('coder123', 10);
//     return {
//         _id: new mongoose.Types.ObjectId(),
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         email: faker.internet.email(),
//         password,
//         role: Math.random() < 0.85 ? 'user' : 'admin',
//         listings: [],
//         documents: [],
//         last_connection: null,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     };
// };