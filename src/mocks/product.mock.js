import { faker } from "@faker-js/faker";

export const generateProductMock = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 20000, max: 1000000 })),
        stock: faker.number.int({ min: 0, max: 10 }),
        category: faker.commerce.department(),
        images: [faker.image.url(), faker.image.url()],
        host: faker.database.mongodbObjectId(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
    };
};