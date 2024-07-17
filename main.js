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

    async init() {
        this.loading = true;
        try {
            this.products = await fetchProducts();
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            this.loading = false;
        }
    },
    get filterItems(){
      if(!this.search){
        return this.products;
      }
      return this.products.filter(product =>
        product.title.toLowerCase().include(this.search.toLowerCase)
      );
    }
    
}));
    

}
)
Alpine.start()