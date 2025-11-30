import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import mongoose from 'mongoose';

describe('Users test', function () {
  this.timeout(10000);

  before(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI);
  });

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        first_name: 'Test',
        last_name: 'User',
        email: 'testuser@example.com',
        password: 'coder123'
      });

    expect(res.status).to.equal(200);
    expect(res.body.user).to.have.property('_id');
  });

  it('should login and update last_connection', async () => {
    const res = await request(app)
      .post('/api/sessions/login')
      .send({
        email: 'testuser@example.com',
        password: 'coder123'
      });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Login exitoso");
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
