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
        const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }
  }));
});

Alpine.start();
