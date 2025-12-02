import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

describe("Users test", function () {
  this.timeout(10000);

  before(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI);
  });

  // Test para registrar un usuario

  it("should register a user", async () => {
    const user1 = await request(app).post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "coder123",
    });

    const user2= await request(app).post("/api/sessions/register").send({
      first_name: "Test2",
      last_name: "User2",
      email: "testuser2@example.com",
      password: "coder123_test2",
    });

    expect(user1.status).to.equal(200);
    expect(user2.status).to.equal(200);
    expect(res.body.user).to.have.property("_id");
  });

  // Test para loguear a un usuario

  it("should login and update last_connection", async () => {
    const res = await request(app).post("/api/sessions/login").send({
      email: "testuser@example.com",
      password: "coder123",
    });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Login exitoso");
  });

  after(async () => {
    // Esto borra toda la base de datos de tests 👇🏼
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
