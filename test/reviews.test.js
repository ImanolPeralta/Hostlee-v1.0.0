import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Reviews test', function () {
  this.timeout(10000);

  before(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI);
  });

  // Test para crear un nuevo producto en la DB de prueba.

  it('It should create a new review', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .send({
        user: '64e3d2f2f2f2f2f2f2f2f2f2',
        product: '64e3d2f2f2f2f2f2f2f2f2f2',
        comment: 'This is a test review',
        rating: 5,
        createdAt: new Date()
      });

    expect(res.status).to.equal(401);
    expect(res.body).to.be.an('object');
  });

  after(async () => {
    // Esto borra toda la base de datos de tests 👇🏼
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
