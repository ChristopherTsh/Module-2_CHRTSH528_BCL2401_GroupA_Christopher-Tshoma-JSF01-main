import './style.css'
import Alpine from 'alpinejs'
import { fetchProducts } from './Api.js';

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {
  Alpine.data('productApp', () => ({
    search: '',
    filteredProducts: [],
    products: [],
    loading: true,
    selectedCategory: '',
    categories: [],

    

    async init() {
        this.loading = true;
        try {
            this.products = await fetchProducts();
            this.categories = await fetchCategories();
            this.filteredProducts = this.products;
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            this.loading = false;
        }
    },
    get filterItems(){
      return this.products.filter(product => {
        const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
        const matchesSearch = this.search === '' || product.title.toLowerCase().includes(this.search.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    },
    filterProducts() {
      this.filteredProducts = this.filterItems;
    },

    searchProducts() {
      this.filteredProducts ();
  }
    
}));
    

}
)
Alpine.start()