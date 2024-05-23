export function countCategories(products) {
  const uniqueCategories = new Set();

  products.forEach((product) => {
    uniqueCategories.add(product.category);
  });

  return uniqueCategories.size;
}
