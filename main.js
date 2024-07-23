import './style.css';
import Alpine from 'alpinejs';
import { fetchProducts, fetchCategories } from './Api.js';

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
  Alpine.data('productApp', () => ({
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: '',
    searchQuery: '',
    loading: true,
    sortOrder: '',
    cartCount: 0, 
    cart:[],
    shippingCost: 50,


    get cartCount() {
      return this.cart.length;
    },

    get cartTotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0) + this.shippingCost;
    },
    

    async init() {
      this.loading = true;
      try {
        this.categories = await fetchCategories();
        this.products = await fetchProducts();
        this.filteredProducts = this.products;
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        this.loading = false;
      }
    },
    filterProducts() {
      this.filteredProducts = this.products.filter(product => {
        const matchesCategory = this.selectedCategory === '' || product.category ===   this.selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      this.sortProducts();
    },
    sortProducts() {
      if (this.sortOrder === 'low') {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === 'high') {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      }
    },

    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    
    removeFromCart(product) {
      this.cart = this.cart.filter(item => item.id !== product.id);
    },

    updateQuantity(product, quantity) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = parseInt(quantity);
        if (existingProduct.quantity <= 0) {
          this.removeFromCart(existingProduct);
        }
      }
    }

  }));
});

Alpine.start();
