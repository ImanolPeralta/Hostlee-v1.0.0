import { faker } from "@faker-js/faker";

export const generateCartMock = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        product: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
    };
};