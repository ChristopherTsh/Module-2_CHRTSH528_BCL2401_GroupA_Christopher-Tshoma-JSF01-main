/**
 * Fetches a list of products from the API.
 * @async
 * @function
 * @returns {Promise<Object[]>} A promise that resolves to an array of product objects, each containing:
 *  - {string} image - The product's image URL.
 *  - {number} id - The product's unique identifier.
 *  - {string} title - The product's title.
 *  - {number} price - The product's price.
 *  - {Object} rating - The product's rating information.
 *  - {string} category - The product's category.
 *  - {string} description - The product's description.
 * @throws {Error} Throws an error if the fetch operation fails.
 */

export async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data.map((product) => ({
      image: product.image,
      id: product.id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      category: product.category,
      description: product.description,
    }));
  } catch (error) {
    console.log("Error fetching products", error);
    throw error;
  }
}

/**
 * Fetches a list of product categories from the API.
 * @async
 * @function
 * @returns {Promise<string[]>} A promise that resolves to an array of category strings.
 * @throws {Error} Throws an error if the fetch operation fails.
 */

export async function fetchCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await response.json();
  } catch (error) {
    console.log("Error fetching categories", error);
    throw error;
  }
}
