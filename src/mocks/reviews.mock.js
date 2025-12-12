import { faker } from "@faker-js/faker";

export const generateReviewMock = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        user: faker.internet.username(),
        product: faker.commerce.productName(),
        comment: faker.word.words(),
        rating: faker.number.int({ min: 1, max: 5 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
    };
};