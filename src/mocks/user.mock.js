import { faker } from "@faker-js/faker";
import _ from "mongoose-paginate-v2";

export const generateUserMock = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 100 }),
        password: faker.internet.password(),
        cart: faker.database.mongodbObjectId(),
        role: faker.person.jobType(),
        avatar: faker.image.avatar(),
        documents: [faker.image.url(), faker.image.url()],
        last_connection: faker.date.past(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
    };
};