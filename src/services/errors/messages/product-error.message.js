export const generateProductErrorInfo = (product) => {
  return `
    Invalid or incomplete product fields:
      * title: expected string, got: ${product.title}
      * description: expected string, got: ${product.description}
      * price: expected number, got: ${product.price}
      * code: expected string, got: ${product.code}
      * stock: expected number, got: ${product.stock}
  `;
};
