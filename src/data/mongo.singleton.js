import mongoose from "mongoose";

// Implement Singleton pattern for only one DB connection instance.

class MongoSingleton {
  static #instance = null;

  constructor () {
    if (MongoSingleton.#instance) {
      return MongoSingleton.#instance;
    }

    this.#connect();
    MongoSingleton.#instance = this;
  }

  async #connect() {
    try {
      await mongoose.connect("mongodb://localhost:27017/hostlee", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("The connection to MongoDB was successful 🟢");
    } catch (error) {
      console.error("Error connecting to MongoDB 🔴:", error);
    }
  }

  static getInstance() {
    if (!MongoSingleton.#instance) {
      MongoSingleton.#instance = new MongoSingleton();
    }

    return MongoSingleton.#instance;
  }
}

export default MongoSingleton;