document.addEventListener('alpine:init', () => {
  Alpine.data('productApp', () => ({
      products: [],
      loading: true,

      async fetchProducts() {
          try {
              const response = await fetch('https://fakestoreapi.com/products');
              const data = await response.json();
              this.products = data.map(product => ({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  rating: product.rating
              }));
              this.loading = false;
          } catch (error) {
              console.error('Error fetching products:', error);
              this.loading = false;
          }
      },

      init() {
          this.fetchProducts();
      }
  }));
});