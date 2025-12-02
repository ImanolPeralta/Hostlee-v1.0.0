import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Cart Test', function () {
  this.timeout(10000);

  before(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI);
  });

  // Test para crear un nuevo producto en la DB de prueba.

  it('It should add a product in the cart', async () => {
    const res = await request(app)
      .post('/api/carts')
      .send({
        products: [
          {
            product: '64c8d8d6f0c6b7b8b8b8b8b8',
            quantity: 1
          }
        ]
      })

    expect(res.status).to.equal(302);
    expect(res.header.location).to.equal('/products');
  });

  after(async () => {
    // Esto borra toda la base de datos de tests 👇🏼
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
