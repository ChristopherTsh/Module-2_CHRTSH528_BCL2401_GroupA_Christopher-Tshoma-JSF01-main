import "./style.css";
import Alpine from "alpinejs";
import focus from "@alpinejs/focus";
import { fetchProducts, fetchCategories } from "./Api.js";

window.Alpine = Alpine;
Alpine.plugin(focus);

/**
 * Initializes Alpine.js data for the product application.
 * @description Sets up the Alpine.js data object with product and cart management functionalities.
 */
document.addEventListener("alpine:init" /** Description placeholder */, () => {
  Alpine.data("productApp", () => ({
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: "",
    searchQuery: "",
    loading: true,
    sortOrder: "",
    cartCount: 0,
    cart: [],
    shippingCost: 50,

    /**
     * Updates the cart count based on the number of items in the cart.
     * @returns {number} The current count of items in the cart.
     */
    setCartCount() {
      this.cartCount = this.cart.length;
      return this.cartCount;
    },

    /**
     * Calculates the total price of items in the cart, including shipping cost.
     * @returns {number} The total cost of items in the cart plus shipping.
     */
    get cartTotal() {
      return (
        this.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) + this.shippingCost
      );
    },

    /**
     * Initializes the application by fetching products and categories.
     * @async
     * @returns {Promise<void>}
     */
    async init() {
      this.loading = true;
      try {
        this.categories = await fetchCategories();
        this.products = await fetchProducts();
        this.filteredProducts = this.products;
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        this.loading = false;
      }
    },
    /**
     * Filters products based on the selected category and search query.
     * @description Applies category and search filters to the product list, then sorts the filtered products.
     */
    filterProducts() {
      this.filteredProducts = this.products.filter((product) => {
        const matchesCategory =
          this.selectedCategory === "" ||
          product.category === this.selectedCategory;
        const matchesSearch = product.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      this.sortProducts();
    },
    /**
     * Sorts the filtered products based on the selected sort order.
     * @description Sorts products by price in ascending or descending order.
     */
    sortProducts() {
      if (this.sortOrder === "low") {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === "high") {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      }
    },
    /**
     * Adds a product to the cart or increments its quantity if already present.
     * @param {Object} product - The product to add to the cart.
     */

    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }

      this.setCartCount();
    },
    /**
     * Removes a product from the cart.
     * @param {Object} product - The product to remove from the cart.
     */
    removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.id !== product.id);
    },
    /**
     * Updates the quantity of a product in the cart.
     * @param {Object} product - The product whose quantity is to be updated.
     * @param {number} quantity - The new quantity of the product.
     */
    updateQuantity(product, quantity) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = parseInt(quantity);
        if (existingProduct.quantity <= 0) {
          this.removeFromCart(existingProduct);
        }
      }
    },
  }));
});

Alpine.start();
