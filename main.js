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
    get cartCount() {
      return this.cart.length;
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
        const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      this.sortProducts();
    },
    // sortProducts() {
    //   if (this.sortOrder === 'price-asc') {
    //     this.filteredProducts.sort((a, b) => a.price - b.price);
    //   } else if (this.sortOrder === 'price-desc') {
    //     this.filteredProducts.sort((a, b) => b.price - a.price);
    //   }
    // },

    addToCart(product){
      this.cart.push(product);
    }

  }));
});

Alpine.start();
