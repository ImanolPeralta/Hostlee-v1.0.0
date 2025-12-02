import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Products test', function () {
  this.timeout(10000);

  before(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI);
  });

  // Test para crear un nuevo producto en la DB de prueba.

  it('It should create a new product in the DB', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        title: 'Test Product',
        description: 'This is a test product',
        price: 100,
        thumbnail: 'test.jpg',
        code: 'TEST123',
        stock: 10,
        category: 'Test Category'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('title', 'Test Product');
  });

  after(async () => {
    // Esto borra toda la base de datos de tests 👇🏼
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
