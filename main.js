import './style.css'
import Alpine from 'alpinejs'
import { fetchProducts } from './Api.js';

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {
  Alpine.data('productApp', () => ({
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
    }
}));

}
)
Alpine.start()